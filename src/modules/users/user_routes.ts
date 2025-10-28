import express from "express";
import { register } from "./user_controller";
const userRouter = express.Router();

userRouter.post("/register", register);

export default userRouter;
