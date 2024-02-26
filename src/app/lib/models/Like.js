import mongoose from 'mongoose'

const likesSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
})

export default mongoose.models.Likes || mongoose.model('Likes', likesSchema)
