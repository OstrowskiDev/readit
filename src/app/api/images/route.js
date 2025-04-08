import s3 from '@/app/lib/cloudflare-sdk/s3'
import validateImageFileServer from '@/app/lib/security/validateImageFileServer'
import { NextResponse } from 'next/server'
import { fileTypeFromBuffer } from 'file-type'
import sharp from 'sharp'

export async function GET(req, res) {
  //!!!! do zmiany lub zastanowienia się czy wgl jest potrzebny ten API route, sokoro i tak GET jest używane tylko w api/images/[id].[imageExtension]/
  console.log('image get API route was triggered...')
  const key = 'testfile.png'
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

export async function PUT(req) {
  // dodaj auth do ochrony route

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const _id = formData.get('_id')

    if (!file || !_id) {
      return NextResponse.json(
        { error: 'Missing file or _id' },
        { status: 400 },
      )
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

    const fileName = `${_id}.webp`

    await s3
      .putObject({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: fileName,
        Body: webpBuffer,
        // ContentType: type.mime,
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

export async function DELETE(req) {
  // dodaj auth do ochrony route

  try {
    const { searchParams } = new URL(req.url)
    const _id = searchParams.get('_id')

    if (!_id) {
      return NextResponse.json(
        { error: 'Missing _id parameter' },
        { status: 400 },
      )
    }

    const fileName = `${_id}.png`

    await s3
      .deleteObject({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: fileName,
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
