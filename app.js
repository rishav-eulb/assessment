const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const rateLimit = require("express-rate-limit");
const searchRoutes = require("./routes/search");
const throttle = require("express-throttle");


const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  "enter your connection string",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", throttle({ burst: 10, rate: '5/s' }), noteRoutes);
app.use("/api/search", throttle({ burst: 10, rate: '5/s' }),searchRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

