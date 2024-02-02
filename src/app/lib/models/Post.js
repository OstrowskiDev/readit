import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    'user-id': String,
    content: String,
  },
  { timestamps: true }
)

export default mongoose.models.Post || mongoose.model('Post', postSchema)

//following code is just temporary solution
//I need to find why Post is imported more than once inside app
// let Post

// if (mongoose.models.Post) {
//   Post = mongoose.model('Post')
// } else {
//   const postSchema = new mongoose.Schema({
//     _id: String,
//     title: String,
//     'user-id': String,
//     content: String,
//   })

//   Post = mongoose.model('Post', postSchema)
// }
