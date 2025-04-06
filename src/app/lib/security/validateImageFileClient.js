import imageTypeWhitelist from './imageTypesWhitelist'

export default async function validateImageFileClient(imageFile) {
  console.log('imageFile:', imageFile)
  const validationObject = { type: false, size: false }

  const isAllowedType = imageTypeWhitelist.some(
    (allowedType) => allowedType.mime === imageFile.type,
  )
  validationObject.type = isAllowedType

  const fileSizeInBytes = imageFile.size
  const maxFileSize = 2 * 1024 * 1024 //2MB
  const hasAllowedSize = maxFileSize >= fileSizeInBytes
  validationObject.size = hasAllowedSize

  return validationObject
}
