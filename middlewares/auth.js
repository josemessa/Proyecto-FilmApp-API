const { error } = require("console");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Acceso denegado: No se proporcionó token");
  }

  try {
    let payload = jwt.verify(token, process.env.TOKEN);
    req.payload = payload;
    next();
  } catch (error) {
    try {
      payload = jwt.verify(token, process.env.TOKENREFRESCO);
      req.payload = payload;
      next();
    } catch (error) {
      return res.status(400).send("Token inválido");
    }
  }
};

const verifyAdmin = (req, res, next) => {
  const isAdmin = req.payload.role;
  if (isAdmin === "admin") {
    next();
  } else {
    return res.status(400).json({
      status: "failed",
      message: "admin credential not found",
    });
  }
};

module.exports = { verifyToken, verifyAdmin };
