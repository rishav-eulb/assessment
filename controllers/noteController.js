const Note = require("../models/Note");

const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ owner: userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    if (!note) return res.status(404).send("Note not found.");
    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const note = new Note({ title, content, owner: userId });
    await note.save();

    res.status(201).send("Note created successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;

    const note = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );

    if (!note) return res.status(404).send("Note not found.");
    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Note.findByIdAndDelete(noteId);

    if (!note) return res.status(404).send("Note not found.");
    res.status(200).send("Note deleted successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const shareNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { userIdToShare } = req.body;

    const note = await Note.findById(noteId);

    if (!note) return res.status(404).send("Note not found.");

    if (!note.sharedWith.includes(userIdToShare)) {
      note.sharedWith.push(userIdToShare);
      await note.save();
    }

    res.status(200).send("Note shared successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
};
