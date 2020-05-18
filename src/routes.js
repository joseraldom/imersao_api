const express = require("express");

const routes = express.Router();
const UsuarioController = require("./app/controllers/UsuarioController");
const SessionController = require("./app/controllers/SessionController");
const authMiddleware = require("./app/middlewares/auth");

routes.post("/session", authMiddleware, SessionController.store);
routes.get("/usuarios", UsuarioController.index);
routes.post("/usuarios", UsuarioController.store);

routes.get("/test", authMiddleware, (req, res) => {
  res.json({ msg: "Token autorizado." });
});

module.exports = routes;
