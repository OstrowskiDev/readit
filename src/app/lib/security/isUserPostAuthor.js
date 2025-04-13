import Post from '@/app/lib/models/Post'
import { connectToDatabase } from '@/app/lib/db'

export async function isUserPostAuthor(session, postId) {
  if (!session?.user?.id || !postId) return false

  const userId = session.user.id
  await connectToDatabase()
  const post = await Post.findOne({ _id: postId, user_id: userId })
  return post ? true : false
}
