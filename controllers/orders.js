import {
  cartsDao as carts,
  ordersDao as orders,
  usersDao as users,
} from "../persistence/index.js";
import { errorLogger, requestLogger } from "../scripts/loggers.js";

import { cartAsDto } from "../persistence/dtos/cartDTO.js";
import { transporter } from "../scripts/nodemailer.js";
import uniqid from "uniqid";

const getOrders = async (req, res) => {
  try {
    let data = await orders.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const addOrder = async (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  let user = await users.getByEmail(req.user.email);
  let data = await carts.getById(user.cart);
  let orderId = uniqid();
  const newOrder = {
    id: orderId,
    buyer: user.username,
    email: user.email,
    phone: user.phone,
    cart: cartAsDto(data),
    timestamp: new Date().valueOf(),
  };
  await orders.add(newOrder);
  const newCart = {
    timestamp: new Date().valueOf(),
    id: uniqid(),
    products: [],
  };
  await carts.add(newCart);
  const newUser = {
    username: user.username,
    email: user.email,
    password: user.password,
    phone: user.phone,
    cart: newCart.id,
  };
  await users.updateByEmail(user.email, newUser);
  let productsDetails = [];
  data.products.forEach((e) => {
    productsDetails.push(`${e.title} - ${e.price} - ${e.id} <br/>`);
  });
  const mailAdmin = {
    from: "Servidor Node.js",
    to: "herrera.cesar.arg@gmail.com",
    subject: `Nuevo pedido de ${user.username} - ${user.email}`,
    html: `${productsDetails}`,
  };
  const mailUser = {
    from: "Servidor Node.js",
    to: user.email,
    subject: `Nuevo pedido en Mi tienda`,
    html: `${productsDetails}`,
  };
  try {
    const info = await transporter.sendMail(mailAdmin);
    requestLogger.info(info);
  } catch (error) {
    errorLogger.error(error);
  }
  try {
    const info = await transporter.sendMail(mailUser);
    requestLogger.info(info);
  } catch (error) {
    errorLogger.error(error);
  }

  res.json({
    message: "Orden generada correctamente",
    data: newOrder,
  });
};

export { addOrder, getOrders };
