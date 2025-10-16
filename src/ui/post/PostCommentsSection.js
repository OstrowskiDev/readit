import { usePostContext } from '@/lib/context/PostContextProvider'
import { Comment } from '@/ui/comment/Comment'

export function PostCommentSection() {
  const { post, postId, comments, setComments } = usePostContext()
  return (
    <div className="post-comments-container lg:px-5 lg:pb-5">
      {post.comments?.length > 0 && (
        <div className="comments-container below-lg:relative border-t border-app-blue/50 pt-2">
          <h3 className="comments-header text-lg pt-1 below-lg:ml-4 font-semibold">
            Comments:
          </h3>
          <div className="comments-list pr-2 pl-7 pb-6 mt-1">
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
