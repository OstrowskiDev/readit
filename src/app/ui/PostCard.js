import PostAuthor from './PostAuthor'

export default async function PostCard({
  _id,
  title,
  user_id,
  content,
  user_name,
  has_image,
}) {
  //!!!! change image type from .jpg according to chosen solution
  //!!!! delete below type check after adding proper code to aggregation pipeline
  has_image = has_image ? has_image : false

  return (
    <div
      className="card-container flex flex-col justify-between flex-grow 
      min-w-[200px] max-w-[600px] h-56 p-4 rounded-md 
      shadow-md hover:shadow-center-md
      transition-all duration-300"
    >
      <h2 className="card-title text-lg font-semibold">{title}</h2>
      <PostAuthor postId={user_id} userName={user_name} />
      {has_image ? (
        <div className="card-image">
          <img src={`/posts/images/${_id}.jpg`} alt="post image" />
        </div>
      ) : (
        <pre className="card-text max-lines-3 font-sans whitespace-pre-wrap">
          {content}
        </pre>
      )}

      <div className="card-btn-container mt-2 flex justify-end">
        <a
          href={`/posts/post/${_id}`}
          className="btn-blue px-4 py-2 rounded-md"
        >
          More
        </a>
      </div>
    </div>
  )
}
