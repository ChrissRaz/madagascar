import mongoose, { Schema, model, models } from "mongoose";

const IdeaSchema = new Schema({
  topicId: { type: Schema.Types.ObjectId, ref: "IdeaTopic", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  answer: String,
  age: Number,
  region: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Idea || mongoose.model("Idea", IdeaSchema);

