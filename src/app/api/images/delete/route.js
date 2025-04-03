import s3 from '@/app/lib/cloudflare-sdk/s3'
import { NextResponse } from 'next/server'

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
