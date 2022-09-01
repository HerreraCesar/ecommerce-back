import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductsByCategory,
  updateProduct,
} from "../controllers/products.js";

import { Router } from "express";
import passport from "passport";

const productsRouter = Router();

productsRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getProducts
);
productsRouter.get(
  "/:category",
  passport.authenticate("jwt", { session: false }),
  getProductsByCategory
);
productsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addProduct
);
productsRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateProduct
);
productsRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteProduct
);

export default productsRouter;
