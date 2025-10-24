import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  discount: number;
  stacks: string[];
  thumbnail: {
    public_id: string | null;
    url: string;
  };
  category: string;
  instructor: mongoose.Types.ObjectId;
  level: "beginer" | "intermediate" | "advanced";
  requirements: string[];
  whatYouWillLearn: string[];
  totalDuration: number;
  enrollmentCount: number;
  averageRating: number;
  reviewCount: number;
  status: "draft" | "published" | "archived";
}

const courseSchema = new mongoose.Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    stacks: { type: [String], default: [] },
    thumbnail: {
      public_id: { type: String, default: null },
      url: { type: String, default: "" },
    },
    category: { type: String, required: true, trim: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    level: {
      type: String,
      enum: ["beginer", "intermediate", "advanced"],
      default: "beginer",
    },
    requirements: { type: [String], default: [] },
    whatYouWillLearn: { type: [String], default: [] },
    totalDuration: { type: Number, default: 0 },
    enrollmentCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.index({
  title: "text",
  description: "text",
  stacks: "text",
  category: "text",
});

courseSchema.index({ instructor: 1 });

const Course =
  mongoose.models.Courses || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
