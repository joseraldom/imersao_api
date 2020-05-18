const Usuario = require("../models/Usuario");

class SessionController {
  async store(req, res) {
    const { email } = req.body;

    const usuario = await Usuario.findOne({ email });

    return res.json(usuario);
  }
}

module.exports = new SessionController();
