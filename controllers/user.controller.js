const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    const user = await User.create({ username, name, email, password });
    res.status(201).json({ message: "Usuario registrado exitosamente", user });
  } catch (error) {
    res.status(400).json({ message: "Error al registrar usuario", error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(400).json({ message: "Error al iniciar sesión", error });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al obtener datos del usuario", error });
  }
};
