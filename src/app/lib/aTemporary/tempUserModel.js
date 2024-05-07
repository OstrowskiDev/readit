import mongoose from 'mongoose'

// Important! When adding new fields to the schema, in case those fields are confidential, make sure to update aggregation pipeline in /app/api/posts/filter/route.js to exclude those fields from the response.
const usersSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    password: String,
    address: String,
    email: String,
    phone: String,
    about: String,
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model('User', usersSchema)
