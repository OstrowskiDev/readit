import { useState } from 'react'
import { ImageShimmerAnimated } from './loaders/ImageShimmerAnimated'

export function PostImage({ postId, imageExtension }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="post-image-container relative aspect-[16/9] w-full overflow-hidden rounded-md bg-gray-200">
      {isLoading && (
        <div className="post-image-container flex justify-center  aspect-[16/9] w-full bg-gray-200 rounded-md relative">
          <ImageShimmerAnimated />
        </div>
      )}

      <img
        className="post-image relative z-10  h-full w-full object-contain"
        src={`/api/images/${postId}.${imageExtension}`}
        alt="post image"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />

      <img
        src={`/api/images/${postId}.${imageExtension}`}
        alt=""
        aria-hidden="true"
        className="post-image-blur absolute inset-0 h-full w-full object-cover scale-110 blur-md brightness-65"
      />
    </div>
  )
}
