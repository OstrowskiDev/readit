import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      maxLength: 30,
      required: true,
      trim: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      maxLength: 1040,
      required: true,
      trim: true,
    },
    has_image: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: [String],
      default: undefined,
    },
    likes: {
      type: [String],
      default: undefined,
    },
    dislikes: {
      type: [String],
      default: undefined,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Post || mongoose.model('Post', postSchema)
