import { logger404 } from "./loggers.js";

export const errors = (req, res, next) => {
  logger404.warn(`ruta ${req.baseUrl} metodo ${req.method} no autorizada`);
  res.send({
    error: -2,
    description: `ruta ${req.baseUrl} metodo ${req.method} no autorizada`,
  });
};
