import { randomUUID } from 'crypto'
import { UUID } from 'mongodb'
import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    _id: {
      type: UUID,
      default: () => randomUUID(),
      required: true,
    },
    user_id: {
      type: UUID,
      required: true,
    },
    parent: {
      type: {
        type: String,
        enum: ['post', 'comment'],
        required: true,
      },
      _id: {
        type: UUID,
        required: true,
      },
    },
    content: {
      type: String,
      maxLength: 520,
      required: true,
      trim: true,
    },
    replies: [UUID],
  },
  { timestamps: true }
)

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema)
