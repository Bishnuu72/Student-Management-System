const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secret = process.env.SECRET_KEY;

const fetchUser = (req, res, next) => {
  const token = req.header("std-token");
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const data = jwt.verify(token, secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = fetchUser;
