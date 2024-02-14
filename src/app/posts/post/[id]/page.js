import { getPost, getUser } from '@/app/lib/db'
import Link from 'next/link'
import PostAuthor from '@/app/ui/PostAuthor'
import { EditPostBtn } from '@/app/ui/buttons/EditPostBtn'
import { DeletePostBtn } from '@/app/ui/buttons/DeletePostBtn'
import { LikeBtn } from '@/app/ui/buttons/LikeBtn'
import { DislikeBtn } from '@/app/ui/buttons/DislikeBtn'
import { ReplyBtn } from '@/app/ui/buttons/ReplyBtn'

export default async function Page({ params }) {
  const postId = params.id
  const post = await getPost(postId)
  const userId = post['user-id']
  const user = await getUser(userId)

  //mock-data, will be replaced with fetch to db
  const comments = [
    {
      id: 1,
      userName: 'User1',
      body: 'This is the first comment.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit!',
      replies: [
        {
          id: 4,
          userName: 'User4',
          body: 'Reply to first comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          replies: [],
        },
      ],
    },
    {
      id: 2,
      userName: 'User2',
      body: 'This is the second comment with multiple replies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      replies: [
        {
          id: 5,
          userName: 'User5',
          body: 'Reply to second comment. Vd minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod',
          replies: [
            {
              id: 6,
              userName: 'User6',
              body: 'Reply to the first reply of second comment.',
              replies: [],
            },
          ],
        },
        {
          id: 7,
          userName: 'User7',
          body: 'Another reply to second comment.',
          replies: [],
        },
      ],
    },
    {
      id: 3,
      userName: 'User3',
      body: 'This is the third comment. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur!',
      replies: [],
    },
  ]

  // Render comment and its replies recursively
  function renderComment(comment, depth = 0) {
    return (
      <div
        className="comment-container relative flex pt-4 px-2"
        key={comment.id}
        style={{ marginLeft: depth * 20 }}
      >
        <div className="comment-styling-element comment-vertical-line absolute left-[-6px] top-14 w-3"></div>
        <div className="comment-main-content-container">
          <div className="comment-username-container relative right-6 flex items-center">
            <div className="comment-avatar w-8 h-8 bg-blue-400 rounded-md"></div>
            <p className="comment-username ml-1 text-blue-900">{comment.userName}</p>
          </div>
          <div className="comment-body-container ml-4">
            <p className="comment-body mt-1 text-lg">{comment.body}</p>
          </div>
          <div className="comment-btns-container flex ml-4">
            <LikeBtn className="comment-btn-like" />
            <DislikeBtn className="comment-btn-dislike" />
            <ReplyBtn className="comment-btn-reply" />
          </div>
          <div style={{ marginLeft: 20 }}>
            {comment.replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full my-8 px-4">
      <div className="post-card-container flex flex-col justify-between max-w-[680px] mx-6 p-4 rounded-md shadow-center-sm">
        <div className="post-header flex justify-between mb-4">
          <h2 className="post-title text-xl pt-1 font-semibold">{post.title}</h2>
          <div className="post-btn-container flex gap-2">
            <EditPostBtn postId={postId} />
            <DeletePostBtn postId={postId} />
          </div>
        </div>
        <PostAuthor postId={post['user-id']} userName={user.name} />
        <p className="post-text break-words">{post.content}</p>
        <div className="post-btn-container comment-btn mt-2 flex justify-end">
          <Link href={`/`} className="btn-blue px-3 py-1 rounded-md">
            Comment
          </Link>
        </div>

        {/* Comments section */}
        <h3 className="comments-section-title text-lg pt-1 font-semibold">Comments:</h3>
        <div className="comments-section bg-gray-100 pl-8 pr-3 pb-6 mt-1 rounded-md">
          {comments.map((comment) => renderComment(comment))}
        </div>
      </div>
    </div>
  )
}
