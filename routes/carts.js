import { cartsDao as carts, productsDao as products } from "../src/daos/index.js";

import { Router } from "express";
import { requestLogger } from "../controllers/loggers.js";
import uniqid from "uniqid";

const routerCarts = Router();

// RUTAS PÚBLICAS

routerCarts.get("/:id", async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`)
  let cartId = req.params.id;
  let data = await carts.getById(cartId);
  res.render('cart', {data})
});

routerCarts.post("/:id/:product", async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`)
  let cartId = req.params.id;
  let productId = req.params.product;
  let cartContent = await carts.getById(cartId);
  let newProduct = await products.getById(productId)
  let cartProducts = cartContent.products;
  const index = cartProducts.findIndex(
    (registry) => registry.id === newProduct.id
  );
  if (index !== -1) {
    const error = "El producto ya se encuentra en el carrito";
    res.render("error", { error });
  } else {
    cartProducts.push(newProduct);
    let data = await carts.updateById(cartId, { products: cartProducts });
    res.redirect(`/carts/${cartId}`)
  }
});

routerCarts.delete("/:id/productos/:id_prod", async (req, res) => {
  let cartId = req.params.id;
  let productId = req.params.id_prod;
  let cartContent = await carts.getById(cartId);
  let cartProducts = cartContent.products;
  const index = cartProducts.findIndex((registry) => registry.id === productId);
  if (index === -1) {
    res.send("El producto no se encuentra en el carrito");
  } else {
    cartProducts.splice(index, 1);
    let data = await carts.updateById(cartId, { products: cartProducts });
    res.send(data);
  }
});

export default routerCarts;
