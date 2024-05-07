import mongoose from 'mongoose'
import validator from 'validator'
import { avatarSeeds, avatarColors } from '../avatars/avatarProps'

// Important! When adding new fields to the schema, in case those fields are confidential, make sure to update aggregation pipeline in /app/api/posts/filter/route.js to exclude those fields from the response.

const usersSchema = new mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-zA-Z0-9 ]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
      match:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,128}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        return validator.isEmail(value)
      },
    },
    address: {
      type: String,
      maxlength: 100,
    },
    phone: {
      type: String,
      maxlength: 20,
    },
    about: {
      type: String,
      maxlength: 600,
    },
    avatar: {
      seed: {
        type: String,
        default: 'Jack',
        enum: avatarSeeds,
      },
      color: {
        type: String,
        default: 'red',
        enum: avatarColors,
      },
    },
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model('User', usersSchema)
