import mongoose from 'mongoose'

const uri = process.env.DB_CONNECT

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    throw new Error('Error in connecting to mongodb')
  }
}

export default connectToDatabase
