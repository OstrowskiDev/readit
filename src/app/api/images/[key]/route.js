import s3 from '@/app/lib/cloudflare-sdk/s3'
import { NextResponse } from 'next/server'
import validateImageFileServer from '@/app/lib/security/validateImageFileServer'
import { fileTypeFromBuffer } from 'file-type'
import sharp from 'sharp'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

//!!!! dodaj caching by nie pobierać w kółko tego samego obrazu
//!!!! dodaj rate limiting
// key: 'name.ext'

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
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { key } = params

  try {
    const formData = await req.formData()
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
      { message: 'File uploaded successfully', fileName },
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

  //!!!! dodaj sprawdzenie czy dany post faktycznie należy do zalogowanego usera

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
