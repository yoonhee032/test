import { Schema, model, models } from "mongoose";

const userSchama = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", userSchama);

export default User;
