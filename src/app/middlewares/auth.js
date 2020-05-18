const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const authConfig = require("../../config/auth");
const Usuario = require("../models/Usuario");

module.exports = async (req, res, next) => {
  let token = "";

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ err: "Usuário não encontrado" });
    } else if (!(await usuario.compareHash(senha))) {
      res.status(401).json({ err: "Senha inválida." });
    }
    token = Usuario.generateToken(usuario.id);
  } else {
    const [, tokenReq] = authHeader.split(" ");
    token = tokenReq;
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.usuarioId = decoded.id;

    return next();
  } catch (error) {
    res.status(401).json({ err: "Token expirou." });
  }
};
