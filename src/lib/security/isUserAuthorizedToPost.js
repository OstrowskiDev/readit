import Post from '@/lib/models/Post'
import { connectToDatabase } from '@/lib/db'

export async function isUserAuthorizedToPost(session, postId) {
  const userId = session?.user?.id
  if (!userId || !postId) return false

  await connectToDatabase()
  const post = await Post.findOne({ _id: postId })

  if (!post) return true //in case of post creation

  if (post.user_id.toString() !== userId) return false // in case of post update
  return true
}
