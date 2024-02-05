import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    address: String,
    email: String,
    phone: String,
    'user-id': String,
  },
  { timestamps: true }
)

export default mongoose.models.Users || mongoose.model('Users', usersSchema)
