import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    cloudinaryImageUrl: { type: String, required: true, trim: true },
    techStack: [{ type: mongoose.Schema.Types.ObjectId, ref: "Technology" }],
    displayOrder: { type: Number, default: 0, min: 0 },
    githubLink: { type: String, default: "", trim: true },
    liveLink: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
