const jwt = require("jsonwebtoken");

const tokenGenerator = (payload, isRefresh) => {
  if (isRefresh) {
    return jwt.sign(payload, process.env.TOKENREFRESCO, {
      expiresIn: "60min",
    });
  }
  return jwt.sign(payload, process.env.TOKEN, { expiresIn: "30min" });
};










module.exports = tokenGenerator