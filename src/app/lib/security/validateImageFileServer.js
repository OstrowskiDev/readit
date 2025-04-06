import imageTypeWhitelist from './imageTypesWhitelist'
import fs from 'fs'
import fileType from 'file-type'

export default async function validateImageFileServer(imageFile) {
  const validationObject = { type: false, size: false }

  const buffer = fs.readFileSync(imageFile)
  const type = await fileType.fromBuffer(buffer)
  const isAllowedType = imageTypeWhitelist.some(
    (fileType) => fileType.ext === type.ext && fileType.mime === type.mime,
  )
  validationObject.type = isAllowedType

  const stats = fs.statSync(imageFile)
  const fileSizeInBytes = stats.size
  const maxFileSize = 2 * 1024 * 1024 //2MB
  const hasAllowedSize = maxFileSize >= fileSizeInBytes
  validationObject.size = hasAllowedSize

  return validationObject
}
