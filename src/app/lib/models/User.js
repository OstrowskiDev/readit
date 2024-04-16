import mongoose from 'mongoose'

// Important! When adding new fields to the schema, make sure to update aggregation pipeline in /app/api/posts/filter/route.js. Reason: otherwise fields will be added to temporary fields in posts and stored in state.
const usersSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    password: String,
    address: String,
    email: String,
    phone: String,
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model('User', usersSchema)
