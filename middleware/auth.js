const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No token proporcionado." });
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No token proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
};

module.exports = authenticate;
