import mongoose, { Document, Model, models, Schema } from "mongoose";

export interface IReview extends Document {
  course: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema<IReview> = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ course: 1 });
ReviewSchema.index({ user: 1 });

const Review: Model<IReview> =
  models.Reviews || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
