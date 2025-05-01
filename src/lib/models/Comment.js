import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    parent: {
      type: {
        type: String,
        enum: ['post', 'comment'],
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      maxLength: 520,
      required: true,
      trim: true,
    },
    replies: {
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
  { timestamps: true }
)

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema)
