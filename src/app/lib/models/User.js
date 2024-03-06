import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    password: String,
    address: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', usersSchema)
