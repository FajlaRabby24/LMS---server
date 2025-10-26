import mongoose, { Document, Model, models, Schema } from "mongoose";

export interface ILecture extends Document {
  title: string;
  course: mongoose.Types.ObjectId;
  chapter: mongoose.Types.ObjectId;
  videoUrl: string;
  duration: number;
  order: number;
  isPreview: boolean;
  resources?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LectureSchema: Schema<ILecture> = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
      index: true,
    },
    videoUrl: { type: String, required: true },
    duration: { type: Number, required: true },
    order: { type: Number, required: true },
    isPreview: { type: Boolean, default: false },
    resources: { type: String },
  },
  {
    timestamps: true,
  }
);

LectureSchema.index({ chapter: 1, order: 1 });

const Lecture: Model<ILecture> =
  models.Lectures || mongoose.model<ILecture>("Lecture", LectureSchema);

export default Lecture;
