export function PostTitle({ title }) {
  return (
    <div className="post-title-container flex justify-between py-2">
      <h2 className="post-title text-xl font-semibold">{title}</h2>
    </div>
  )
}
