export function PostAnchor({ postId }) {
  return (
    <a className="absolute inset-0 z-20" href={`/posts/post/${postId}`}></a>
  )
}
