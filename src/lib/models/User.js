import mongoose from 'mongoose'
import validator from 'validator'
import { avatarSeeds, avatarColors } from '../avatars/avatarProps'

const usersSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    activation_token: String,
    token_expires_at: Date,
    is_active: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-zA-Z0-9 ]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    failed_login_attempts: {
      type: Number,
      default: 0,
    },
    last_login_attempt: Date,
    status: {
      type: String,
      default: 'ok',
    },
    recovery_token: String,
    recovery_token_expires_at: Date,
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
    favorites: {
      type: [
        {
          _id: String,
          type: {
            type: String,
            enum: ['post', 'comment'],
          },
        },
      ],
    },
  },
  { timestamps: true },
)

usersSchema.index({ token_expires_at: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.User || mongoose.model('User', usersSchema)
