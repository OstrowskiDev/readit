import imageTypeWhitelist from './imageTypesWhitelist'
import { fileTypeFromBuffer } from 'file-type'

export default async function validateImageFileServer(imageFile) {
  const validationObject = { type: false, size: false }

  const arrayBuffer = await imageFile.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const type = await fileTypeFromBuffer(buffer)
  const isAllowedType = imageTypeWhitelist.some(
    (fileType) => fileType.ext === type.ext && fileType.mime === type.mime,
  )
  validationObject.type = isAllowedType

  const fileSizeInBytes = buffer.length
  const maxFileSize = 2 * 1024 * 1024 //2MB
  const hasAllowedSize = maxFileSize >= fileSizeInBytes
  validationObject.size = hasAllowedSize

  return validationObject
}
