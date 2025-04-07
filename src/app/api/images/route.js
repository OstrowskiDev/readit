import s3 from '@/app/lib/cloudflare-sdk/s3'
import validateImageFileServer from '@/app/lib/security/validateImageFileServer'
import { NextResponse } from 'next/server'
import { fileTypeFromBuffer } from 'file-type'

export async function GET(req, res) {
  console.log('image get API route was triggered...')
  // const { key } = req.query;
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

    const fileBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(fileBuffer)
    const type = await fileTypeFromBuffer(buffer)
    const fileName = `${_id}.${type.ext}`

    await s3
      .putObject({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: fileName,
        Body: buffer,
        ContentType: type.mime,
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
