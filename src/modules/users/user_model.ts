import mongoose, { Document, Model, models, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  isVerified: boolean;
  role: "user" | "instructor" | "admin";
  avatar?: {
    public_id: string;
    url: string;
  };
  signature?: {
    public_id: string;
    url: string;
  };
  userName: string;
  refreshToken?: string | null;
  refreshTokenExpiry?: Date | null;
  activationCode?: string | null;
  activationCodeExpiry?: Date | null;
  resetPasswordOtp?: string | null;
  resetPasswordOtpExpiry?: Date | null;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => emailRegex.test(v),
        message: (props: any) => `${props.value} is not a valid email`,
      },
    },
    password: { type: String, required: false, select: false },
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["user", "instructor", "admin"],
      default: "user",
    },
    avatar: {
      public_id: { type: String, default: null },
      url: { type: String, default: null },
    },
    signature: {
      public_id: { type: String, default: null },
      url: { type: String, default: null },
    },
    userName: String,
    refreshToken: { type: String, default: null, select: false },
    refreshTokenExpiry: { type: Date, default: null, select: false },
    activationCode: { type: String, default: null, select: false },
    activationCodeExpiry: { type: Date, default: null, select: false },
    resetPasswordOtp: { type: String, default: null, select: false },
    resetPasswordOtpExpiry: { type: Date, default: null, select: false },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ role: 1 });

const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", userSchema);

export default User;
