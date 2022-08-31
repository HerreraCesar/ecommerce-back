import { errorLogger, requestLogger } from "./loggers.js";

import { app } from "../server.js";
import cluster from "cluster";
import config from "../config.js";
import { cpus } from "os";
import process from "process";

export const forkServer = () => {
  const server = app.listen(config.PORT, () => {
    requestLogger.info(
      `Servidor escuchando en el puerto ${server.address().port}`
    );
  });
  server.on("error", (error) => errorLogger.error(`Error en el servidor ${error}`));
  requestLogger.info(`Worker ${process.pid} started`);
};

export const clusterServer = () => {
  const CPUs = cpus().length;
  if (cluster.isPrimary) {
    requestLogger.info(`Primary ${process.pid} is running`);
    for (let i = 0; i < CPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      requestLogger.info(`worker ${worker.process.pid} died`);
    });
  } else {
    forkServer();
  }
};
