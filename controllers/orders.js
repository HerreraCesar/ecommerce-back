import {
    cartsDao as carts,
    ordersDao as orders,
    usersDao as users,
} from "../persistence/index.js";
import { errorLogger, requestLogger } from "../scripts/loggers.js";

import { transporter } from "../scripts/nodemailer.js";
import uniqid from "uniqid";

const addOrder = async (req, res) => {
    requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
    let data = await carts.getById(req.user.cart);
    let orderId = uniqid();
    const newOrder = {
      id: orderId,
      buyer: req.user.username,
      email: req.user.email,
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
      email: req.user.email,
      password: req.user.password,
      phone: req.user.phone,
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
      subject: `Nuevo pedido de ${req.user.username} - ${req.user.email}`,
      html: `${productsDetails}`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      requestLogger.info(info);
    } catch (error) {
      errorLogger.error(error);
    }
  
    res.render("cart", { data: newCart });
  }

  export {
    addOrder
  }