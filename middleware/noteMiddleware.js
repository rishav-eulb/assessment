const Note = require("../models/Note");

const validateOwnership = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).send("Note not found.");

    if (note.owner.toString() !== userId)
      return res
        .status(403)
        .send("You do not have permission to access this note.");

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  validateOwnership,
};
