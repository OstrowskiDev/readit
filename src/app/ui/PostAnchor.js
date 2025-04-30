export function PostAnchor({ postId }) {
  return <a className="absolute inset-0" href={`/posts/post/${postId}`}></a>
}
