import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import s3 from '@/lib/cloudflare-sdk/s3'
import { isUserAuthorizedToPost } from '@/lib/security/isUserAuthorizedToPost'
import validateImageFileServer from '@/lib/security/validateImageFileServer'
import { validateKey } from '@/lib/security/validateKey'
import { fileTypeFromBuffer } from 'file-type'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import sharp from 'sharp'

/**
 * This route expects `params.key` in the format: 'postId.webp'.
 * - For user posts, the post ID must be a UUID.
 * - For admin posts, the post ID may also use kebab-case format.
 */

//!!!! dodaj caching do GET by nie pobierać w kółko tego samego obrazu
//!!!! dodaj rate limiting

export async function GET(request, { params }) {
  const { key } = params
  if (!validateKey(key)) {
    return NextResponse.json({ error: 'Invalid req data.' }, { status: 400 })
  }

  try {
    const data = await s3
      .getObject({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: key,
      })
      .promise()
    return new NextResponse(data.Body, {
      status: 200,
      headers: {
        'Content-Type': data.ContentType,
      },
    })
  } catch (error) {
    console.error('Unexpected error in image get API route.', error)
    return NextResponse.json(
      { error: 'Error retrieving file.' },
      { status: 500 },
    )
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 401 })
  }

  const { key } = params
  if (!validateKey(key)) {
    return NextResponse.json({ error: 'Invalid req data.' }, { status: 400 })
  }

  const postId = getPostId(key)
  const isAuthorized = await isUserAuthorizedToPost(session, postId)
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!file || !key) {
      return NextResponse.json({ error: 'Missing req data.' }, { status: 400 })
    }

    const validationResult = await validateImageFileServer(file)

    if (!validationResult.type) {
      return NextResponse.json(
        { error: 'File type not allowed.' },
        { status: 415 },
      )
    }

    if (!validationResult.size) {
      return NextResponse.json({ error: 'File too large.' }, { status: 413 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const type = await fileTypeFromBuffer(buffer)
    let webpBuffer
    if (type.ext === 'webp') {
      webpBuffer = buffer
    } else {
      webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer()
    }

    await s3
      .putObject({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: key,
        Body: webpBuffer,
        ContentType: 'image/webp',
      })
      .promise()

    return NextResponse.json(
      { message: 'File uploaded successfully', key },
      { status: 200 },
    )
  } catch (error) {
    console.error('Unexpected error in image upload API route.', error)
    return NextResponse.json(
      { error: 'Error uploading file.' },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 401 })
  }

  try {
    const { key } = params

    if (!validateKey(key)) {
      return NextResponse.json({ error: 'Invalid req data.' }, { status: 400 })
    }

    const postId = getPostId(key)

    const isAuthorized = await isUserAuthorizedToPost(session, postId)
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Not authorized.' }, { status: 403 })
    }

    await s3
      .deleteObject({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: key,
      })
      .promise()

    return NextResponse.json(
      { message: 'File deleted successfully:', key },
      { status: 200 },
    )
  } catch (error) {
    console.error('Unexpected error in image delete API route.', error)
    return NextResponse.json({ error: 'Error deleting file.' }, { status: 500 })
  }
}

function getPostId(key) {
  const postId = key.slice(0, -'.webp'.length)
  return postId
}
