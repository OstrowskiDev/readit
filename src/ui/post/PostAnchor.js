export function PostAnchor({ postId }) {
  return (
    <a className="absolute inset-0 z-10" href={`/posts/post/${postId}`}></a>
  )
}
