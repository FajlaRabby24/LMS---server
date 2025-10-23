import app from "./app";
import config from "./config";

const PORT = config.port;

const startServer = async () => {
  app.listen(PORT, () => console.log(`server is runnig on port - ${PORT}`));
};

startServer();
