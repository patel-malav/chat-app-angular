import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    // reciever: {
    //   type: String,
    //   enum: ['admin', 'another user'],
    //   required: true,
    // },
    message: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 128,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 3,
      maxlength: 256,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 256,
    },
    age: {
      type: Number,
      min: 13,
      max: 100,
    },
    image: {
      type: String,
      minlength: 10,
      maxlength: 1024,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
  }
);

export default mongoose.model('User', userSchema);
