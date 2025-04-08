import s3 from '@/app/lib/cloudflare-sdk/s3'
import { NextResponse } from 'next/server'
//!!!! dodaj caching by nie pobierać w kółko tego samego obrazu
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
