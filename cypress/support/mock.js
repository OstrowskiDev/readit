const postTitle = 'Cypress Tests Post'
const postContent =
  'This is a test post created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting top-level comments. Also adding and removing likes from top-level comments.'
const commentContent =
  'This is a test top-level comment created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting top-level comments. Also adding and removing likes from top-level comments.'
const newCommentContent = `${commentContent} Edited`
const replyContent =
  'This is a test reply-level comment created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting reply-level comments. Also adding and removing likes from reply-level comments.'
const newReplyContent = `${replyContent} Edited`

const mockData = {
  postTitle,
  postContent,
  commentContent,
  newCommentContent,
  replyContent,
  newReplyContent,
}

export default mockData
