import { cartsDao as carts, usersDao as users } from "../persistence/index.js";
import { errorLogger, requestLogger } from "./loggers.js";

import { ExtractJwt } from "passport-jwt";
import { Strategy as JWTStrategy } from "passport-jwt";
import bcrypt from "bcrypt";
import { Strategy as localStrategy } from "passport-local";
import { transporter } from "./nodemailer.js";
import uniqid from "uniqid";

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const loginStrategy = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    let user = await users.getByEmail(email);
    if (user === false) {
      requestLogger.info("El usuario no existe");
      return done(null, false);
    } else if (!isValidPassword(user, password)) {
      requestLogger.info("Contraseña incorrecta");
      return done(null, false);
    } else {
      return done(null, user);
    }
  }
);

export const registationStrategy = new localStrategy(
  {
    passReqToCallback: true,
    usernameField: "email",
    passwordField: "password",
  },
  async (req, email, password, done) => {
    let user = await users.getByEmail(email);
    if (user !== false) {
      requestLogger.info(`El usuario ${email} ya se encuentra registrado`);
      return done(null, false);
    }
    const newUser = {
      username: req.body.username,
      password: createHash(password),
      email: email,
      phone: req.body.phone,
      timestamp: new Date().valueOf(),
      cart: uniqid(),
    };
    const newCart = {
      timestamp: new Date().valueOf(),
      id: newUser.cart,
      products: [],
    };
    const mailOptions = {
      from: "Servidor Node.js",
      to: "herrera.cesar.arg@gmail.com",
      subject: "Nuevo registro en Mi tienda",
      html: `
        <h2>Se registró un nuevo usuario con los siguientes datos:</h2>
        <p><strong>Nombre: </strong>${newUser.username}</p>
        <p><strong>Correo electrónico: </strong>${newUser.email}</p>
        <p><strong>Teléfono: </strong>${newUser.phone}</p>
        <p><strong>Id carrito: </strong>${newUser.cart}</p>
        <p><strong>Timestamp: </strong>${newUser.timestamp}</p>
      `,
    };
    try {
      const info = await users.add(newUser);
      requestLogger.info(info);
    } catch (error) {
      errorLogger.error(error);
    }
    try {
      const info = await carts.add(newCart);
      requestLogger.info(info);
    } catch (error) {
      errorLogger.error(error);
    }
    try {
      const info = await transporter.sendMail(mailOptions);
      requestLogger.info(info);
    } catch (error) {
      errorLogger.error(error);
    }
    return done(null, newUser);
  }
);

export const tokenStrategy = new JWTStrategy(
  {
    secretOrKey: "coderhouse",
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
);
