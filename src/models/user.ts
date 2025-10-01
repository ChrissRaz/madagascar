import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

export default models.User || model("User", UserSchema);
