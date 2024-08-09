const Note = require("../models/note");

// to do add pagination , search , filters qurey params

exports.getNotes = (req, res) => {
  res.send("get notes controller");
};

exports.getNote = (req, res) => {
  res.send("get note controller");
};

exports.createNote = (req, res) => {
    
  res.send("create note controller");
};

exports.patchNote = (req, res) => {
  res.send("patch note controller");
};

exports.deleteNote = (req, res) => {
  res.send("delete note controller ");
};
