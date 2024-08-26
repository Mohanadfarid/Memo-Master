const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants");

const Note = require("../models/note");
const User = require("../models/user");
const Tag = require("../models/tag");
const { ValidationError } = require("sequelize");

// to do add pagination , search , filters qurey params

exports.getNotes = (req, res) => {
  res.send("get notes controller");
};

exports.getNote = (req, res) => {
  res.send("get note controller");
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, status, tags } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, SECRET_KEY);

    // first we find the user with the provided token
    const user = await User.findByPk(id);

    // second we create a note & attach it to that user
    const note = await user.createNote({
      title,
      content,
      status,
    });

    // third we create and attach all the provided tags to that note
    tags.map((tag) => {
      note.createTag({ content: tag });
    });

    res.status(200).json({ message: "note created successfully" });
  } catch (error) {
    if (error instanceof ValidationError) {
      const { errors } = error;
      console.log(errors);
      let formatedErrors = {};

      errors.forEach((err) => {
        // console.log(formatedErrors);
        formatedErrors[err.path] = err.message;
      });

      console.log(error);
      res.status(500).json({ error: "validation errors", ...formatedErrors });
    } else {
      // generac error
      console.log(error);
      return res.status(500).json({ error });
    }
  }
};

exports.patchNote = (req, res) => {
  res.send("patch note controller");
};

exports.deleteNote = (req, res) => {
  res.send("delete note controller ");
};
