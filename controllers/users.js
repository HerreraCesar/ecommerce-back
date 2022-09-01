import { errorLogger, requestLogger } from "../scripts/loggers.js";

import config from "../config.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import { userAsDto } from "../persistence/dtos/userDTO.js";

const getInfo = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  res.render("home", { data: config });
};

const postLogin = async (req, res, next) => {
  passport.authenticate("login", async (error, user, info) => {
    try {
      if (error || !user) {
        errorLogger.error(`Error en el servidor ${error}`);
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const data = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: data }, "coderhouse", {
          expiresIn: "24h",
        });
        return res.json({ ...userAsDto(user), token });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
};

const postRegistration = async (req, res, next) => {
  passport.authenticate("login", async (error, user, info) => {
    try {
      if (error || !user) {
        errorLogger.error(`Error en el servidor ${error}`);
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const data = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: data }, "coderhouse", {
          expiresIn: "24h",
        });
        return res.json({ ...userAsDto(user), token });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
};

export { getInfo, postRegistration, postLogin };
