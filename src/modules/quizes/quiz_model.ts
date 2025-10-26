import mongoose, { Document, Model, models, Schema } from "mongoose";

export interface IQuizQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface IQuiz extends Document {
  course: mongoose.Types.ObjectId;
  chapter: mongoose.Types.ObjectId;
  title: string;
  order: number;
  questions: IQuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema<IQuiz> = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: Number, required: true },
        explanation: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

QuizSchema.index({ chapter: 1, order: 1 });
QuizSchema.index({ course: 1, order: 1 });
QuizSchema.index({ course: 1, chapter: 1 });
QuizSchema.index({ "questions.correctAnswer": 1 });
QuizSchema.index({ title: "text" });
QuizSchema.index({ createdAt: -1 });
QuizSchema.index({ updatedAt: -1 });

const Quiz: Model<IQuiz> =
  models.Quizs || mongoose.model<IQuiz>("Quiz", QuizSchema);

export default Quiz;
