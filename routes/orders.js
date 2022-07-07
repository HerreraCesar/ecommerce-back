import {
  cartsDao as carts,
  ordersDao as orders,
  usersDao as users,
} from "../src/daos/index.js";
import { client, transporter } from "../server.js";

import { Router } from "express";
import { requestLogger } from "../controllers/loggers.js";
import uniqid from "uniqid";

const routerOrders = Router();

routerOrders.post("/", async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  let data = await carts.getById(req.user.cart);
  let orderId = uniqid();
  const newOrder = {
    id: orderId,
    buyer: req.user.username,
    email: req.user.id,
    phone: req.user.phone,
    cart: data,
    timestamp: new Date().valueOf(),
  };
  let result = await orders.add(newOrder);
  const newCart = {
    timestamp: new Date().valueOf(),
    id: uniqid(),
    products: [],
  };
  await carts.add(newCart);
  const newUser = {
    username: req.user.username,
    password: req.user.password,
    direction: req.user.direction,
    age: req.user.age,
    phone: req.user.phone,
    photo: req.user.photo,
    cart: newCart.id,
  };
  await users.updateById(req.user.id, newUser);

  let productsDetails = [];
  data.products.forEach((e) => {
    productsDetails.push(`${e.title} - ${e.price} - ${e.id} <br/>`);
  });
  const mailOptions = {
    from: "Servidor Node.js",
    to: "herrera.cesar.arg@gmail.com",
    subject: `Nuevo pedido de ${req.user.username} - ${req.user.id}`,
    html: `${productsDetails}`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    requestLogger.info(info);
  } catch (error) {
    errorLogger.error(error);
  }

  try {
    const message = await client.messages.create({
      body: `Nuevo pedido de ${req.user.username} - ${req.user.id}`,
      from: "+19854017204",
      to: "+543469695548",
    });
    requestLogger.info(message);
  } catch (error) {
    errorLogger.error(error);
  }
  try {
    const message = await client.messages.create({
      body: `Su pedido ha sido recibido y está siendo procesado con el código ${newOrder.id}`,
      from: "+19854017204",
      to: req.user.phone,
    });
    requestLogger.info(message);
  } catch (error) {
    errorLogger.error(error);
  }

  res.render("cart", { data: newCart });
});

export default routerOrders;
