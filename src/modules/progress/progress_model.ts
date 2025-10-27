import mongoose, { Document, Model, models, Schema } from "mongoose";

interface IQuizProgress {
  completed: boolean;
  score: number;
  completedAt: Date;
}

export interface ICourseProgress extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  completedLectures: Map<string, boolean>;
  completedQuizzes: Map<string, IQuizProgress>;
  lastViewedLecture?: mongoose.Types.ObjectId;
  totalLecturesCompleted: number;
  totalQuizzesCompleted: number;
  quizzesCompleted: boolean;
  averageQuizScore: number;
  isCourseCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseProgressSchema: Schema<ICourseProgress> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLectures: { type: Map, of: Boolean, default: {} },
    completedQuizzes: {
      type: Map,
      of: new mongoose.Schema(
        {
          completed: { type: Boolean, required: true, default: false },
          score: { type: Number, required: true, default: 0 },
          completedAt: { type: Date },
        },
        { _id: false }
      ),
      default: {},
    },
    lastViewedLecture: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" },
    totalLecturesCompleted: { type: Number, default: 0 },
    totalQuizzesCompleted: { type: Number, default: 0 },
    quizzesCompleted: { type: Boolean, default: false },
    averageQuizScore: { type: Number, default: 0 },
    isCourseCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

CourseProgressSchema.index({ user: 1, course: 1 }, { unique: true });

const CourseProgress: Model<ICourseProgress> =
  models.CourseProgresss ||
  mongoose.model<ICourseProgress>("CourseProgress", CourseProgressSchema);

export default CourseProgress;
