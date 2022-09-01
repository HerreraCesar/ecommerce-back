import * as dotenv from "dotenv";

import { hideBin } from "yargs/helpers";
import os from "os";
import yargs from "yargs";

const { enviroment } = yargs(hideBin(process.argv))
  .alias({
    e: "enviroment",
  })
  .default({
    enviroment: "development",
  }).argv;

dotenv.config({
  path: `.env.${enviroment}`,
});

export default {
  mongodb: {
    connectionString: process.env.MONGO_CONNECTION_STRING,
  },
  PORT: process.env.PORT || 8080,
  MODE: process.env.MODE || "cluster",
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  PERSISTENCE: process.env.PERSISTENCE,
  variables: {
    platform: process.env.OS,
    node: process.version,
    memory: process.memoryUsage.rss(),
    path: process.argv[1],
    id: process.pid,
    folder: process.cwd(),
    processors: os.cpus().length,
  },
};
