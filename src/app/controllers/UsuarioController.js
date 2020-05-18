const Usuario = require("../models/Usuario");

class UsuarioController {
  async store(req, res) {
    const { email } = req.body;

    if (await Usuario.findOne({ email })) {
      return res.status(400).json({ err: "Usuário já existe." });
    }

    const usuario = await Usuario.create(req.body);

    return res.json(usuario);
  }

  async index(req, res) {
    const usuario = await Usuario.find();

    return res.json(usuario);
  }
}

module.exports = new UsuarioController();
