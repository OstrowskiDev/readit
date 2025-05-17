import imageTypeWhitelist from './imageTypesWhitelist'
import { fileTypeFromBuffer } from 'file-type'

export default async function validateImageFileServer(imageFile) {
  console.log('🚀 ~ validateImageFileServer ~ imageFile:', imageFile)
  const validationObject = { type: false, size: false }

  const arrayBuffer = await imageFile.arrayBuffer()
  console.log('🚀 ~ validateImageFileServer ~ arrayBuffer:', arrayBuffer)
  const buffer = Buffer.from(arrayBuffer)
  console.log('🚀 ~ validateImageFileServer ~ buffer:', buffer)
  const type = await fileTypeFromBuffer(buffer)
  console.log('🚀 ~ validateImageFileServer ~ type:', type)
  const isAllowedType = imageTypeWhitelist.some(
    (fileType) => fileType.ext === type.ext && fileType.mime === type.mime,
  )
  validationObject.type = isAllowedType

  const fileSizeInBytes = buffer.length
  console.log(
    '🚀 ~ validateImageFileServer ~ fileSizeInBytes:',
    fileSizeInBytes,
  )
  const maxFileSize = 2 * 1024 * 1024 //2MB
  console.log('🚀 ~ validateImageFileServer ~ maxFileSize:', maxFileSize)
  const hasAllowedSize = maxFileSize >= fileSizeInBytes
  validationObject.size = hasAllowedSize
  console.log('🚀 ~ validateImageFileServer ~ hasAllowedSize:', hasAllowedSize)

  console.log(
    '🚀 ~ validateImageFileServer ~ validationObject:',
    validationObject,
  )
  return validationObject
}
