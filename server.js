import { Strategy as LocalStrategy } from "passport-local";
import MongoStore from "connect-mongo";
import bcrypt from "bcrypt";
import { cartsDao as carts } from "./src/daos/index.js";
import cluster from "node:cluster";
import config from "./src/config.js";
import { cpus } from "node:os";
import { createTransport } from "nodemailer";
import { engine } from "express-handlebars";
import { errors } from "./controllers/errors.js";
import express from "express";
import { fileURLToPath } from "url";
import passport from "passport";
import path from "path";
import { requestLogger } from "./controllers/loggers.js";
import routerCarts from "./routes/carts.js";
import routerOrders from "./routes/orders.js";
import routerProducts from "./routes/products.js";
import routerUsers from "./routes/users.js";
import session from "express-session";
import twilio from "twilio";
import uniqid from "uniqid";
import { usersDao as users } from "./src/daos/index.js";

// ------------- INICIALIZANDO APP ------------- //
const app = express();
const time = new Date().valueOf();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------- SESIONES ------------- //
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongodb.connectionString,
    }),
    resave: true,
    saveUninitialized: true,
    rolling: true,
    secret: "ecommerce",
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  })
);

// ------------- NODEMAILER ------------- //
export const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

// ------------- TWILIO ------------- //
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
export const client = new twilio(accountSid, authToken);

// ------------- PASSPORT ------------- //
app.use(passport.initialize());
app.use(passport.session());

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    let user = await users.getById(username);
    if (user === false) {
      requestLogger.info("El usuario no existe");
      return done(null, false);
    }
    if (!isValidPassword(user, password)) {
      requestLogger.info("Contraseña incorrecta");
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.use(
  "registration",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user = await users.getById(req.body.email);
      if (user !== false) {
        requestLogger.info(`El usuario ${username} ya se encuentra registrado`);
        return done(null, false);
      }
      const newUser = {
        username: username,
        password: createHash(password),
        id: req.body.email,
        direction: req.body.direction,
        age: req.body.age,
        phone: req.body.phone,
        photo: req.file.filename,
        timestamp: time,
        cart: uniqid(),
      };
      const newCart = {
        timestamp: new Date().valueOf(),
        id: newUser.cart,
        products: [],
      };
      await carts.add(newCart);
      await users.add(newUser);

      const mailOptions = {
        from: "Servidor Node.js",
        to: "herrera.cesar.arg@gmail.com",
        subject: "Nuevo registro en Mi tienda",
        html: `
          <h2>Se registró un nuevo usuario con los siguientes datos:</h2>
          <p><strong>Nombre: </strong>${username}</p>
          <p><strong>Correo electrónico: </strong>${req.body.email}</p>
          <p><strong>Dirección: </strong>${req.body.direction}</p>
          <p><strong>Edad: </strong>${req.body.age}</p>
          <p><strong>Teléfono: </strong>${req.body.phone}</p>
          <p><strong>Id carrito: </strong>${newUser.cart}</p>
          <p><strong>Timestamp: </strong>${newUser.timestamp}</p>
        `,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        requestLogger.info(info);
      } catch (error) {
        errorLogger.error(error);
      }

      try {
        const message = await client.messages.create({
          body: "Se ha registrado un nuevo usuario",
          from: "+19854017204",
          to: "+543469695548",
        });
        requestLogger.info(message);
      } catch (error) {
        errorLogger.error(error);
      }

      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (username, done) => {
  let user = await users.getById(username);
  return done(null, user);
});

// ------------- VISTAS ------------- //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

// ------------- RUTAS ------------- //
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/products", routerProducts);
app.use("/carts", routerCarts);
app.use("/users", routerUsers);
app.use("/orders", routerOrders);
app.use("*", errors);

// ------------- INICIALIZANDO SERVIDOR ------------- //
if (config.MODE === "cluster") {
  const numCPUs = cpus().length;

  if (cluster.isPrimary) {
    requestLogger.info(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      requestLogger.info(`worker ${worker.process.pid} died`);
    });
  } else {
    const server = app.listen(config.PORT, () => {
      requestLogger.info(
        `Servidor escuchando en el puerto ${server.address().port}`
      );
    });
    server.on("error", (error) =>
      errorLogger.error(`Error en el servidor ${error}`)
    );

    requestLogger.info(`Worker ${process.pid} started`);
  }
} else {
  const server = app.listen(config.PORT, () => {
    requestLogger.info(
      `Servidor escuchando en el puerto ${server.address().port}`
    );
  });
  server.on("error", (error) =>
    errorLogger.error(`Error en el servidor ${error}`)
  );
}
