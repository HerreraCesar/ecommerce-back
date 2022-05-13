import { Router } from "express";
import { cartsDao as cart } from "../src/daos/index.js";
import uniqid from "uniqid";

const routerCart = Router();

// RUTAS PÚBLICAS

routerCart.post("/", async (req, res) => {
  let timestamp = new Date(Date.now()).toLocaleString();
  let id = uniqid();
  const registry = { id, timestamp, products: [] };
  let data = await cart.add(registry);
  res.send(data);
});

routerCart.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let data = await cart.deleteById(id);
  res.send(data);
});

routerCart.get("/:id", async (req, res) => {
  let id = req.params.id;
  let data = await cart.getById(id);
  res.send(data);
});

routerCart.post("/:id/productos", async (req, res) => {
  let cartId = req.params.id;
  let cartContent = await cart.getById(cartId);
  let newProduct = req.body;
  let cartProducts = cartContent.products;
  const index = cartProducts.findIndex(
    (registry) => registry.id === newProduct.id
  );
  if (index !== -1) {
    res.send("El producto ya se encuentra en el carrito");
  } else {
    cartProducts.push(newProduct);
    let data = await cart.updateById(cartId, { products: cartProducts });
    res.send(data);
  }
});

routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
  let cartId = req.params.id;
  let productId = req.params.id_prod;
  let cartContent = await cart.getById(cartId);
  let cartProducts = cartContent.products;
  const index = cartProducts.findIndex((registry) => registry.id === productId);
  if (index === -1) {
    res.send("El producto no se encuentra en el carrito");
  } else {
    cartProducts.splice(index, 1);
    let data = await cart.updateById(cartId, { products: cartProducts });
    res.send(data);
  }
});

export default routerCart;
