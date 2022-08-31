import { Router } from "express";
import { addOrder } from "../controllers/orders.js";

const ordersRouter = Router();

ordersRouter.post("/", addOrder);

export default ordersRouter;
