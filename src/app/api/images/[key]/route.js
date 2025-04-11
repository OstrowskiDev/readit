import s3 from '@/app/lib/cloudflare-sdk/s3'
import { NextResponse } from 'next/server'
import validateImageFileServer from '@/app/lib/security/validateImageFileServer'
import { fileTypeFromBuffer } from 'file-type'
import sharp from 'sharp'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
// pamars has following data: {key: 'fileName.ext'}

//!!!! dodaj caching do GET by nie pobierać w kółko tego samego obrazu
//!!!! dodaj rate limiting

export async function GET(request, { params }) {
  const { key } = params
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
    console.error('unexpected error in image get API route', error)
    return NextResponse.json(
      { error: 'Error retrieving file' },
      { status: 500 },
    )
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  const { key } = params
  //!!!! make sure that key from params is not abused by user: check if it matches UUID.webp pattern, also check if UUID matches postId && userId === session.userId
  //!!!! if implementing above make sure that admin can update his post that don't fallow UUID pattern

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !key) {
      return NextResponse.json({ error: 'Missing req data' }, { status: 400 })
    }

    const validationResult = await validateImageFileServer(file)

    if (!validationResult.type) {
      return NextResponse.json(
        { error: 'File type not allowed' },
        { status: 415 },
      )
    }

    if (!validationResult.size) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 })
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
    console.error('Unexpected error in image upload API route', error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  //!!!! dodaj sprawdzenie czy dany post faktycznie należy do zalogowanego użytkownika

  try {
    const { key } = params
    if (!key) {
      return NextResponse.json({ error: 'Missing req data.' }, { status: 400 })
    }

    await s3
      .deleteObject({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: key,
      })
      .promise()

    return NextResponse.json(
      { message: 'File deleted successfully', fileName },
      { status: 200 },
    )
  } catch (error) {
    console.error('Unexpected error in image delete API route', error)
    return NextResponse.json({ error: 'Error deleting file' }, { status: 500 })
  }
}
