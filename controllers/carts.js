import {
  cartsDao as carts,
  productsDao as products,
} from "../persistence/index.js";

import { cartAsDto } from "../persistence/dtos/cartDTO.js";
import { requestLogger } from "../scripts/loggers.js";

const getCart = async (req, res, next) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  try {
    const cartId = req.params.id;
    let data = await carts.getById(cartId);
    res.json(cartAsDto(data));
  } catch (error) {
    next(error);
  }
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
    res.json({
      status: 400,
      message: "El producto ya se encuentra en el carrito",
    });
  } else {
    cartProducts.push(newProduct);
    const total = cartContent.total + newProduct.price;
    let data = await carts.updateById(cartId, {
      products: cartProducts,
      total: total,
    });
    res.json({
      status: 200,
      message: "Producto agregado al carrito correctamente",
      cart: cartAsDto(data.new),
    });
  }
};

const deleteProductFromCart = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  let cartId = req.params.cart_id;
  let productId = req.params.product_id;
  let cartContent = await carts.getById(cartId);
  let productToRemove = await products.getById(productId);
  let cartProducts = cartContent.products;
  const index = cartProducts.findIndex((registry) => registry.id === productId);
  if (index === -1) {
    res.json({
      status: 400,
      message: "El producto no se encuentra en el carrito",
    });
  } else {
    cartProducts.splice(index, 1);
    const total = cartContent.total - productToRemove.price;
    let data = await carts.updateById(cartId, {
      products: cartProducts,
      total: total,
    });
    res.json({
      status: 200,
      message: "Producto eliminado del carrito correctamente",
      cart: cartAsDto(data.new),
    });
  }
};

const clearCart = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  let cartId = req.params.cart_id;
  let data = await carts.updateById(cartId, { products: [], total: 0 });
  res.json({
    status: 200,
    message: "Carrito vaciado correctamente",
    cart: cartAsDto(data.new),
  });
};

export { getCart, addProductToCart, deleteProductFromCart, clearCart };
