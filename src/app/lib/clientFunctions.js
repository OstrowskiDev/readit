export function getDescendants(comment, comments) {
  let commentDescendants = []
  function findDescendantsOf(comment) {
    if (!comment.replies || comment.replies.length === 0) return
    comment.replies.map((replyId) => {
      const reply = comments.find((c) => c._id === replyId)
      commentDescendants.push(reply)
      findDescendantsOf(reply)
    })
  }
  findDescendantsOf(comment)

  return commentDescendants
}
