import {
  cartsDao as carts,
  productsDao as products,
} from "../persistence/index.js";

import { cartAsDto } from "../persistence/dtos/cartDTO.js";
import { requestLogger } from "../scripts/loggers.js";

const getCart = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  let cartId = req.params.id;
  let data = await carts.getById(cartId);
  res.json(cartAsDto(data));
};

const addProductToCart = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  let cartId = req.params.cart_id;
  let productId = req.params.product_id;
  let cartContent = await carts.getById(cartId);
  let newProduct = await products.getById(productId);
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
    res.redirect(`/carts/${cartId}`);
  }
};

const deleteProductFromCart = async (req, res) => {
  let cartId = req.params.cart_id;
  let productId = req.params.product_id;
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
};

export { getCart, addProductToCart, deleteProductFromCart };
