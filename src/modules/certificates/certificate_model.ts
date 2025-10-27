import mongoose, { Document, Model, models, Schema } from "mongoose";

export interface ICertificate extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  issueDate: Date;
  certificateId: string;
  downloadUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema: Schema<ICertificate> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    issueDate: { type: Date, required: true },
    certificateId: { type: String, required: true, unique: true },
    downloadUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

CertificateSchema.index({ user: 1, course: 1 }, { unique: true });

const Certificate: Model<ICertificate> =
  models.Certificates ||
  mongoose.model<ICertificate>("Certificate", CertificateSchema);

export default Certificate;
