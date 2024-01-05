// routes/notes.js
const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { validateOwnership } = require("../middleware/noteMiddleware");

router.use(authenticateToken);

router.get("/", noteController.getNotes);
router.get("/:id", validateOwnership, noteController.getNoteById);
router.post("/", noteController.createNote);
router.put("/:id", validateOwnership, noteController.updateNote);
router.delete("/:id", validateOwnership, noteController.deleteNote);
router.post("/:id/share", validateOwnership, noteController.shareNote);

module.exports = router;
