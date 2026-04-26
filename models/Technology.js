import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    cloudinarySvgUrl: { type: String, default: "", trim: true },
    color: { type: String, default: "", trim: true },
    displayOrder: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

TechnologySchema.index({ name: 1 }, { unique: true });

export default mongoose.models.Technology || mongoose.model("Technology", TechnologySchema);
