import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.js";

import { Router } from "express";
import passport from "passport";

const productsRouter = Router();

productsRouter.get(
  "/:id?",
  passport.authenticate("jwt", { session: false }),
  getProducts
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
