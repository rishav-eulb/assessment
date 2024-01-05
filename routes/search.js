// routes/search.js
const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.use(authenticateToken);

router.get("/", searchController.searchNotes);

module.exports = router;
