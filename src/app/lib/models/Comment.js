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
      default: undefined, // this default value prevents mongoose form generating empty array by default. Alos it will not do that on update or updateOne when replies will not be defined in updateData object.
    },
  },
  { timestamps: true }
)

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema)
