import imageTypeWhitelist from './imageTypesWhitelist'

export default async function validateImageFileClient(imageFile) {
  const validationObject = {
    type: { status: 'error', message: '' },
    size: { status: 'error', message: '' },
  }

  const isAllowedType = imageTypeWhitelist.some(
    (allowedType) => allowedType.mime === imageFile.type,
  )
  validationObject.type.status = isAllowedType ? 'success' : 'error'
  validationObject.type.message =
    'Only png, jpg, jpeg, webp, gif, bmp are allowed.'

  const fileSizeInBytes = imageFile.size
  const maxFileSize = 2 * 1024 * 1024 //2MB
  const hasAllowedSize = maxFileSize >= fileSizeInBytes
  validationObject.size.status = hasAllowedSize ? 'success' : 'error'
  validationObject.size.message = 'You can upload image no larger than 2MB'

  return validationObject
}
