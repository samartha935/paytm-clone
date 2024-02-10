import mongoose from "mongoose";

mongoose.connect("mongodb+srv://samarthudupa5:PgV5cFFTGt4M3ssH@cluster0.qiavfvk.mongodb.net/paytm-clone")


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 8,
    maxLength: 50,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
});


export const User = mongoose.model("User", userSchema)