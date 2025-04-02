import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  endpoint: process.env.CLOUDFLARE_R2_URL,
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  region: 'auto',
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
})

export default s3
