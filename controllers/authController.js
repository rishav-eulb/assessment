const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();

    res.status(201).send("User created successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
     const options = { expiresIn: "1h" };

    if (!user) return res.status(401).send("Invalid username or password.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).send("Invalid username or password.");

    const token = jwt.sign(
      { id: user._id, username: user.username },
      config.jwtSecret,
      options
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  signup,
  login
};
