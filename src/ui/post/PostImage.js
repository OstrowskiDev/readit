import { useState } from 'react'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { ImageShimmerBorderless } from '../loaders/ImageShimmerBorderless'

export function PostImage() {
  const [isLoading, setIsLoading] = useState(true)
  const { postId, imageExtension, tempImageUrl } = usePostContext()
  const imageSrc = tempImageUrl || `/api/images/${postId}.${imageExtension}`

  return (
    <div className="post-image-container relative aspect-[16/9] w-full overflow-hidden rounded-md z-10">
      {isLoading && (
        <div className="post-image-container flex justify-center aspect-[16/9] w-full glass-blue-soft rounded-md relative">
          <ImageShimmerBorderless />
        </div>
      )}

      <img
        className="post-image relative z-10 h-full w-full object-contain"
        src={imageSrc}
        alt="post image"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />

      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className="post-image-blur absolute inset-0 h-full w-full object-cover scale-110 blur-md brightness-65"
      />
    </div>
  )
}
