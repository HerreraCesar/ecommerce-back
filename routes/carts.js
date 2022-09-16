import {
  addProductToCart,
  clearCart,
  deleteProductFromCart,
  getCart,
} from "../controllers/carts.js";

import { Router } from "express";
import passport from "passport";

const cartsRouter = Router();

cartsRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getCart
);
cartsRouter.post(
  "/:cart_id/:product_id",
  passport.authenticate("jwt", { session: false }),
  addProductToCart
);
cartsRouter.delete(
  "/:cart_id/:product_id",
  passport.authenticate("jwt", { session: false }),
  deleteProductFromCart
);
cartsRouter.delete(
  "/:cart_id",
  passport.authenticate("jwt", { session: false }),
  clearCart
);

export default cartsRouter;
