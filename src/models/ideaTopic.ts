import mongoose, { Schema } from "mongoose";

const IdeaTopicSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  longDescription: String,
  imageId: String, // chemin vers public/uploads
  startDate: String,
  endDate: String
});

export default mongoose.models.IdeaTopic || mongoose.model("IdeaTopic", IdeaTopicSchema);
