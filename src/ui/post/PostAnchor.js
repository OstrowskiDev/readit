export function PostAnchor({ postId, title, hasImage }) {
  return (
    <a
      className="absolute inset-0 z-10"
      href={`/posts/post/${postId}${hasImage ? '?i=true' : ''}`}
      aria-label={`Read post: ${title}`}
    ></a>
  )
}
