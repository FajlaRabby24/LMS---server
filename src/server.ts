import app from "./app";
import config from "./config";
import connectDB from "./config/db";

const PORT = config.port;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`🚀 server is runnig on port - ${PORT}`));
};

startServer();
