import {
  addProductToCart,
  deleteProductFromCart,
  getCart,
} from "../controllers/carts.js";

import { Router } from "express";

const cartsRouter = Router();

cartsRouter.get("/:id", getCart);
cartsRouter.post("/:cart_id/:product_id", addProductToCart);
cartsRouter.delete("/:cart_id/:product_id", deleteProductFromCart);

export default cartsRouter;
