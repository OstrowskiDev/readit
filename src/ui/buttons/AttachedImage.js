'use client'

export function AttachedImage({
  hasImage = false,
  imageFile,
  setImageFile,
  imageAction,
  setImageAction,
}) {
  const fallbackValues = { name: 'current_image', size: null }
  const renderedImage = imageFile || fallbackValues

  async function handleClick(event) {
    event.preventDefault()
    setImageAction('delete')
    setImageFile(null)
  }

  function shortFileName(fileName) {
    const maxLength = 18
    return fileName.length > maxLength
      ? fileName.substring(0, maxLength) + '...'
      : fileName
  }

  function fileSize(fileSize) {
    const imageSize = `(${Math.ceil(renderedImage.size / 1024)}K)`
    if (fileSize) return imageSize
    return ''
  }

  return (
    <>
      {((hasImage && imageAction !== 'delete') || imageAction === 'update') && (
        <div className="wrapper-orange-btn-bg ml-2 mt-1 mr-2">
          <div className="attached-image-box button-silver flex flex-row items-center h-9 px-2 text-sm">
            <p className="attached-image-info text-gray-100 cursor-default">{`${shortFileName(
              renderedImage.name,
            )} ${fileSize(renderedImage.size)}`}</p>
            <button
              aria-label="Remove attached image"
              className="attached-image-disattach ml-2 px-1 mb-2 text-white cursor-pointer"
              onClick={handleClick}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  )
}
