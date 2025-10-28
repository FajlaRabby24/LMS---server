import bcrypt from "bcryptjs";
import User, { IUser } from "./user_model";
import { findUserByEmail } from "./user_repository";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = userData;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
      errors: ["An account with this email already exists"],
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // assign admin role for the first user
  const existingUserCount = await User.estimatedDocumentCount();
  const assignedRole: IUser["role"] =
    existingUserCount === 0 ? "admin" : "user";

  const newUser = new User({
    name,
    email,
    password: hashPassword,
    role: assignedRole,
  });

  // TODO: send verification email

  await newUser.save();
  return {
    success: true,
    message: "User registerd successfully",
    data: {
      newUser,
    },
  };
};
