import { getMessages, postMessage } from "../controllers/support.js";

import { Router } from "express";
import passport from "passport";

const supportRouter = Router();

supportRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    getMessages
);

supportRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    postMessage
);

export default supportRouter;