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
      default: undefined, // this default value prevents mongoose form generating empty array by default. This will also prevent accident reply deletion with update or updateOne with payload that doesn't have reply prop.
    },
    likes: {
      type: [String],
      default: undefined,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema)
