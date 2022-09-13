import { addOrder, getOrders } from "../controllers/orders.js";

import { Router } from "express";
import passport from "passport";

const ordersRouter = Router();

ordersRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getOrders
);

ordersRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addOrder
);

export default ordersRouter;
