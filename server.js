// ------------- IMPORTS ------------- //

import { clusterServer, forkServer } from "./scripts/cluster.js";
import {
  loginStrategy,
  registationStrategy,
  tokenStrategy,
} from "./scripts/strategies.js";

import { Server } from "socket.io";
import cartsRouter from "./routes/carts.js";
import config from "./config.js";
import cors from "cors";
import { createServer } from "http";
import { engine } from "express-handlebars";
import { errorHandler } from "./middlewares/errors.js";
import express from "express";
import { fileURLToPath } from "url";
import ordersRouter from "./routes/orders.js";
import passport from "passport";
import path from "path";
import productsRouter from "./routes/products.js";
import supportRouter from "./routes/support.js";
import usersRouter from "./routes/users.js";
import { websocket } from "./scripts/websocket.js";

// ------------- EXPRESS ------------- //
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------- CORS ------------- //
app.use(cors())

// ------------- PASSPORT ------------- //
app.use(passport.initialize());
passport.use("login", loginStrategy);
passport.use("registration", registationStrategy);
passport.use(tokenStrategy);

// ------------- WEBSOCKETS ------------- //
export const http = createServer(app);
export const io = new Server(http);
io.on("connection", websocket);

// ------------- VISTAS ------------- //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public/static"));

// ------------- RUTAS ------------- //
app.use("/", usersRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);
app.use("/support", supportRouter)
app.get("*", errorHandler);
app.use(errorHandler);

// ------------- INICIALIZANDO SERVIDOR ------------- //
if (config.MODE === "cluster") {
  clusterServer();
} else {
  forkServer();
}
