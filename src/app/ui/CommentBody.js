import { CommentButtons } from './CommentButtons'
import { CommentContextProvider } from '../lib/context/CommentContextProvider'
import { CommentAuthorsInfo } from './CommentAuthorsInfo'
import { Comment } from './Comment'

export function CommentBody({
  comment,
  comments,
  setComments,
  commentId,
  depth,
  postId,
  renderChildren,
  deleteOptimistically,
  setDeleteOptimistically,
  rootPostId,
  setToggleCollapse,
  toggleCollapse,
  anchorComment,
  handleMouseEnter,
  handleMouseLeave,
  enableReplyBtn,
}) {
  return (
    <div
      className="comment-container relative flex pt-4 px-2"
      id={commentId}
      style={{
        marginLeft: depth === 0 ? 0 : 25,
        display: deleteOptimistically ? 'none' : 'flex',
      }}
    >
      {/* comment accordion element */}
      <div
        className="comment-collapse-element comment-vertical-line absolute left-[4px] top-14 w-3"
        onClick={() => setToggleCollapse((prevValue) => !prevValue)}
      >
        {toggleCollapse && (
          <div className="comment-collapse-icon absolute flex justify-center items-center w-5 h-5 top-8 left-[-4px] bg-gray-100 border border-gray-400 rounded-full text-gray-400">
            <p className="pb-[2px]">+</p>
          </div>
        )}
      </div>

      <div className="comment-main-content-container w-full">
        {/* authors avatar, user name, comment time, edit time */}
        <CommentAuthorsInfo
          comment={comment}
          anchorComment={anchorComment}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />

        {/* comment content */}
        <div className="comment-body-container ml-4">
          <pre className="comment-body mt-1 text-lg font-sans whitespace-pre-wrap">
            {comment.content}
          </pre>
        </div>

        {/* comment buttons */}
        <CommentContextProvider
          comment={comment}
          commentId={commentId}
          postId={rootPostId}
          setDeleteOptimistically={setDeleteOptimistically}
          comments={comments}
          setComments={setComments}
          enableReplyBtn={enableReplyBtn}
        >
          <CommentButtons />
        </CommentContextProvider>

        {/* comment replies */}
        {!toggleCollapse && renderChildren && (
          <div className="comment-replies ml-[20px]">
            {comment.replies.map((replyId) => {
              const reply = comments.find((c) => c._id === replyId)
              return (
                <Comment
                  key={replyId}
                  comment={reply}
                  comments={comments}
                  setComments={setComments}
                  commentId={replyId}
                  depth={depth + 1}
                  postId={postId}
                  renderChildren={renderChildren}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
