import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    'user-id': String,
    content: String,
  },
  { timestamps: true }
)

export default mongoose.models.Post || mongoose.model('Post', postSchema)
