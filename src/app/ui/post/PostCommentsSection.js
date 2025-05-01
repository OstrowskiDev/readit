import { usePostContext } from '@/lib/context/PostContextProvider'
import { Comment } from '@/app/ui/comment/Comment'

export function PostCommentSection() {
  const { post, postId, comments, setComments } = usePostContext()
  return (
    <div className="post-comments-container md:px-5 md:pb-5 bg-white">
      {post.comments && (
        <div className="comments-container below-md:relative">
          <h3 className="comments-header text-lg pt-1 below-md:ml-4 font-semibold">
            Comments:
          </h3>
          <div className="comments-list pr-2 pl-7 pb-6 mt-1 bg-gray-100 md:rounded-md">
            {post.comments?.map((commentId) => {
              const comment = comments.find((c) => c._id === commentId)
              return (
                <Comment
                  key={commentId}
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                  commentId={commentId}
                  depth={0}
                  postId={postId}
                  renderChildren={true}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
