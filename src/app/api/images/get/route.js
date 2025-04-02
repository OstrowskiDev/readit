import s3 from '@/app/lib/cloudflare-sdk/s3'
import { NextResponse } from 'next/server'

export async function GET(req, res) {
  console.log('image get API route was triggered...')
  // const { key } = req.query;
  const key = 'testfile.png'
  const bucket = 'readit'
  try {
    const data = await s3
      .getObject({
        Bucket: bucket,
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
