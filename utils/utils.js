const jwt = require("jsonwebtoken");

const tokenGenerator = (payload, isRefresh) => {
  if (isRefresh) {
    return jwt.sign(payload, process.env.TOKEN_REFRESH, {
      expiresIn: "60min",
    });
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "30min" });
};




module.exports = tokenGenerator;