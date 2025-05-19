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
        <div className="attached-image-box btn-blue flex flex-row h-8 px-2 pt-[6px] ml-2 mt-1 mr-2 text-sm">
          <p className="attached-image-info text-gray-100 cursor-default">{`${shortFileName(
            renderedImage.name,
          )} ${fileSize(renderedImage.size)}`}</p>
          <button
            className="attached-image-disattach ml-2 px-1 mb-2 text-white cursor-pointer"
            onClick={handleClick}
          >
            X
          </button>
        </div>
      )}
    </>
  )
}
