import { Schema, model } from "mongoose";

import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const userShema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
})

userShema.pre("findOneAndUpdate", handleUpdateValidate)

userShema.post("save", handleSaveError)
userShema.post("findOneAndUpdate", handleSaveError)

const User = model("user", userShema)

export default User