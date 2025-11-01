import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import userRouter from "./modules/users/user_routes";
import { globalErrorHandler } from "./utils/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.CLIENT_URL!],
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("LMS - backend server is running");
});

// ---------- global error handler ----------
app.use(globalErrorHandler);

export default app;
