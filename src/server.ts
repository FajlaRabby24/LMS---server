import app from "./app";
import config from "./config";
import { connectDB } from "./config/db";

const PORT = config.port;

const startServer = async () => {
  await connectDB()
    .then(() => {
      console.log("✅ MongoDB connected successfully");
      app.listen(PORT, () =>
        console.log(`🚀 server is runnig on port - ${PORT}`)
      );
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err);
    });
};

startServer();
