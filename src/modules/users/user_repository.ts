import User from "./user_model";

export const findUserByEmail = (email: string) => {
  return User.findOne({ email });
};
