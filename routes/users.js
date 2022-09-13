import { getInfo, postLogin, postRegistration } from "../controllers/users.js";

import { Router } from "express";
import passport from "passport";

const usersRouter = Router();

usersRouter.get("/", getInfo);
usersRouter.post("/login", postLogin);
usersRouter.post(
  "/registration",
  passport.authenticate("registration", { session: false }),
  postRegistration
);

export default usersRouter;
