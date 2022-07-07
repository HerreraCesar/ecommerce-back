import { Router } from "express";
import { isAuth } from "../middleware/auth.js";
import multer from "multer";
import passport from "passport";
import { requestLogger } from "../controllers/loggers.js";

const routerUsers = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: storage });

// ------------- LOGIN ------------- //
routerUsers.get("/login", (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  res.render("login");
});
routerUsers.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/users/loginError",
    successRedirect: "/products",
  })
);
routerUsers.get("/loginError", (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  const error = "Login error";
  res.render("error", { error });
});

// ------------- REGISTRATION ------------- //
routerUsers.get("/registration", (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  res.render("registration");
});
routerUsers.post(
  "/registration",
  upload.single("photo"),
  passport.authenticate("registration", {
    failureRedirect: "/users/registrationError",
    successRedirect: "/products",
  })
);
routerUsers.get("/registrationError", (req, res) => {
  requestLogger.info(`ruta ${req.url} metodo ${req.method} autorizada`);
  const error = "Registration error";
  res.render("error", { error });
});

// ------------- LOGOUT ------------- //
routerUsers.get("/logout", isAuth, async (req, res) => {
  let user = req.user;
  req.logout((error) => {
    if (!error) {
      res.render("logout", { user });
    } else {
      res.send({ status: "Logout ERROR", body: error });
    }
  });
});

// ------------- ACCOUNT ------------- //
routerUsers.get("/account", isAuth, async (req, res) => {
  let user = req.user;
  res.render("account", { user });
});

export default routerUsers;
