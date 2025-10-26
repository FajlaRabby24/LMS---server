import mongoose, { Document } from "mongoose";

export interface IChapter extends Document {
  title: string;
  course: mongoose.Types.ObjectId;
  order: number;
  chapterDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

const ChapterSchema: mongoose.Schema<IChapter> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
    },
    chapterDuration: {
      type: Number,
      default: 0,
      min: [0, "Chapter duration cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

ChapterSchema.index({ course: 1, order: 1 });

const Chapter: mongoose.Model<IChapter> =
  mongoose.models.Chapters ||
  mongoose.model<IChapter>("Chapter", ChapterSchema);

export default Chapter;
