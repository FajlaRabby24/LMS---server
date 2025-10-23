import dotenv from "dotenv";
dotenv.config();

interface IConfig {
  port: number;
}

const config: IConfig = {
  port: Number(process.env.PORT) || 5000,
};

export default config;
