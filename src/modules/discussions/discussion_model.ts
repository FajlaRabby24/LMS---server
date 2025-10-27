import mongoose, { Document, Model, models, Schema } from "mongoose";

interface IDiscussionAnswer {
  user: mongoose.Types.ObjectId;
  text: string;
  isInstructorAnswer: boolean;
  createdAt: Date;
}

export interface IDiscussion extends Document {
  user: mongoose.Types.ObjectId;
  lecture: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  question: string;
  answers: IDiscussionAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

const DiscussionAnswerSchema = new mongoose.Schema<IDiscussionAnswer>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    isInstructorAnswer: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const DiscussionSchema: Schema<IDiscussion> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    question: { type: String, required: true },
    answers: { type: [DiscussionAnswerSchema], default: [] },
  },
  { timestamps: true }
);

DiscussionSchema.index({ lecture: 1 });
DiscussionSchema.index({ user: 1 });

const Discussion: Model<IDiscussion> =
  models.Discussions ||
  mongoose.model<IDiscussion>("Discussion", DiscussionSchema);

export default Discussion;
