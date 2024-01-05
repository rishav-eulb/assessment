const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Validation middleware
const validateSignup = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  next();
};

router.post("/signup", validateSignup, authController.signup);
router.post("/login", authController.login);

module.exports = router;
