export function PostAnchor({ postId, title }) {
  return (
    <a
      className="absolute inset-0 z-10"
      href={`/posts/post/${postId}`}
      aria-label={`Read post: ${title}`}
    ></a>
  )
}
