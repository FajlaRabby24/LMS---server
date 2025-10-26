import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountValue: number;
  appliesTo: "all" | mongoose.Types.ObjectId;
  expiresAt?: Date;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema: Schema<ICoupon> = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountValue: { type: Number, required: true, min: 1, max: 100 },
    appliesTo: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: "all",
    },
    expiresAt: { type: Date },
    isActive: { type: Boolean, required: true, default: true },
    usageLimit: { type: Number },
    usageCount: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

CouponSchema.index({ code: 1 }, { unique: true });
CouponSchema.index({ isActive: 1, expiresAt: 1 });
CouponSchema.index({ createdAt: -1 });
CouponSchema.index({ updatedAt: -1 });

const Coupon: Model<ICoupon> =
  mongoose.models.Coupons || mongoose.model<ICoupon>("Coupon", CouponSchema);

export default Coupon;
