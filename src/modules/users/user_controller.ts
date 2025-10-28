import { Request, Response } from "express";
import * as userService from "./user_services";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await userService.registerUser(req.body);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User registration failed!" });
  }
};
