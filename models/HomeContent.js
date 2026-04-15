import mongoose from "mongoose";

const TrustedCompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, default: "", trim: true },
  },
  { _id: false },
);

const TestimonialSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const HomeContentSchema = new mongoose.Schema(
  {
    heroImageUrl: { type: String, default: "/jkimage.png", trim: true },
    trustedCompanies: { type: [TrustedCompanySchema], default: [] },
    testimonials: { type: [TestimonialSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.models.HomeContent || mongoose.model("HomeContent", HomeContentSchema);
