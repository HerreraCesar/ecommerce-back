import {
  cartsDao as carts,
  ordersDao as orders,
  usersDao as users,
} from "../persistence/index.js";
import { errorLogger, requestLogger } from "../scripts/loggers.js";

import { cartAsDto } from "../persistence/dtos/cartDTO.js";
import { orderAsDto } from "../persistence/dtos/orderDTO.js";
import { transporter } from "../scripts/nodemailer.js";
import uniqid from "uniqid";
import { userAsDto } from "../persistence/dtos/userDTO.js";

const getOrders = async (req, res, next) => {
  try {
    if (req.query.email) {
      const userOrders = [];
      let email = req.query.email;
      let data = await orders.getAll();
      data.forEach((order) => {
        if (order.email === email) {
          userOrders.push(orderAsDto(order));
        }
      });
      res.json(userOrders);
    } else {
      let data = await orders.getAll();
      res.json(orderAsDto(data));
    }
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
    timestamp: Date.now(),
  };
  await orders.add(newOrder);
  const newCart = {
    timestamp: Date.now(),
    id: uniqid(),
    products: [],
    total: 0,
  };
  await carts.add(newCart);
  const newUser = {
    username: user.username,
    email: user.email,
    password: user.password,
    phone: user.phone,
    cart: newCart.id,
    chat: user.chat,
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
    data: { order: orderAsDto(newOrder), user: userAsDto(newUser) },
  });
};

export { addOrder, getOrders };
