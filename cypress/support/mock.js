const postTitle = 'Cypress Tests Post'
const postContent =
  'This is a test post created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting top-level comments. Also adding and removing likes from top-level comments.'
const postTitleEdited = `${postTitle} Edited`
const postContentEdited = `${postContent} (Edited)`
const commentContent =
  'This is a test top-level comment created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting top-level comments. Also adding and removing likes from top-level comments.'
const commentContentEdited = `${commentContent} Edited`
const replyContent =
  'This is a test reply-level comment created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting reply-level comments. Also adding and removing likes from reply-level comments.'
const replyContentEdited = `${replyContent} Edited`
const userAboutMe =
  'I am a test user created for Cypress E2E testing. This profile is used to verify UI functionality and user interactions.'
const userAddress = '123 Test Street, Cypress City, CA 90210, USA'
const userPhone = '+1 (555) 123-4567'

const mockData = {
  postTitle,
  postTitleEdited,
  postContent,
  postContentEdited,
  commentContent,
  commentContentEdited,
  replyContent,
  replyContentEdited,
  userAboutMe,
  userAddress,
  userPhone,
}

export default mockData
