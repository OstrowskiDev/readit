import imageTypeWhitelist from './imageTypesWhitelist'
import fs from 'fs'
import fileType from 'file-type'

export default async function validateImageFile(imageFile) {
  const buffer = fs.readFileSync(imageFile)
  const type = await fileType.fromBuffer(buffer)

  if (imageTypeWhitelist.some((fileType) => fileType === type)) {
    return { valid: true }
  } else {
    return { valid: false }
  }
}
