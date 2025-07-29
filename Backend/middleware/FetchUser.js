const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token"); // Frontend must send this header
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // { id, role }

    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: "User role not found in token." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

module.exports = { fetchUser, isAdmin };
