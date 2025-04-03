import s3 from '@/app/lib/cloudflare-sdk/s3'
import { NextResponse } from 'next/server'

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

    const fileBuffer = await file.arrayBuffer()
    const fileName = `${_id}.png`

    await s3
      .putObject({
        Bucket: process.env.CLOUDFLARE_BUCKET,
        Key: fileName,
        Body: Buffer.from(fileBuffer),
        ContentType: 'image/png',
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
