import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    cloudinarySvgUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

TechnologySchema.index({ name: 1 }, { unique: true });

export default mongoose.models.Technology || mongoose.model("Technology", TechnologySchema);
