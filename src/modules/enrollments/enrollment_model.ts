import mongoose, { Document, Model, models, Schema } from "mongoose";

export interface IEnrollment extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  coupon?: mongoose.Types.ObjectId;
  enrollmentDate: Date;
  amountPaid: number;
  paymentStatus: "pending" | "free" | "paid";
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema: Schema<IEnrollment> = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    enrollmentDate: { type: Date, default: Date.now },
    amountPaid: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["pending", "free", "paid"],
      default: "paid",
    },
    stripeSessionId: { type: String },
  },
  {
    timestamps: true,
  }
);

EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
EnrollmentSchema.index({ student: 1, enrollmentDate: -1 });
EnrollmentSchema.index({ course: 1, enrollmentDate: -1 });
EnrollmentSchema.index({ paymentStatus: 1, enrollmentDate: -1 });

const Enrollment: Model<IEnrollment> =
  models.Enrollments ||
  mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);

export default Enrollment;
