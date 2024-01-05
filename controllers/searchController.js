// controllers/searchController.js
const Note = require("../models/Note");

const searchNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = req.query.q;

    const notes = await Note.find({
      $and: [{ owner: userId }, { $text: { $search: query } }],
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  searchNotes,
};
