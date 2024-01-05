const jwt = require("jsonwebtoken");
const config = require("../config");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

//   console.log(config.jwtSecret);

  if (!token) return res.status(401).send("Access denied. Token not provided.");

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).send("Invalid token.");

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
