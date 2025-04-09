'use client'

export function AttachedImage({ imageFile, setImageFile }) {
  async function handleClick(event) {
    event.preventDefault()
    setImageFile(null)
  }

  function shortFileName(fileName) {
    const maxLength = 16
    return fileName.length > maxLength
      ? fileName.substring(0, maxLength) + '...'
      : fileName
  }

  return (
    <>
      {imageFile && (
        <div className="attached-image-box btn-blue flex flex-row h-8 px-2 pt-[6px] ml-2 mt-1 mr-2 text-sm">
          <p className="attached-image-info text-gray-100 cursor-default">{`${shortFileName(
            imageFile.name,
          )} (${Math.ceil(imageFile.size / 1024)}K)`}</p>
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
