const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants");

const Note = require("../models/note");
const User = require("../models/user");
const Tag = require("../models/tag");
const { ValidationError } = require("sequelize");

// to do add pagination , search , filters qurey params

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ include: Tag });
    return res.status(200).json({ message: "success", notes });
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};

exports.getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id, { include: Tag });
    return res.status(200).json({ message: "success", note });
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, status, tags } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, SECRET_KEY);

    // first we find the user with the provided token
    const user = await User.findByPk(id);

    // handle if no user was found
    if (!user) {
      return res.status(500).json({ error: "user was not found" });
    }

    // second we create a note & attach it to that user
    const note = await user.createNote({
      title,
      content,
      status,
    });

    // third we create and attach all the provided tags to that note
    tags.map(async (tag) => {
      const retrivedTag = await Tag.findOne({
        where: { content: tag },
      });

      // add the tag if it doesn't exsist in the db
      if (!retrivedTag) {
        note.createTag({ content: tag });
      } else {
        // assosiate the note with the already found tag
        await note.addTag(retrivedTag);
      }
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
      return res.status(500).json({ error: "something went wrong" });
    }
  }
};

exports.patchNote = (req, res) => {
  res.send("patch note controller");
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, SECRET_KEY);

    const note = await Note.findByPk(noteId);

    // handle if the note is note found in the db
    if (!note) {
      return res.status(500).json({ error: "note not found !" });
    }

    // handle if another user tried to delete the note
    if (note.UserId !== id) {
      return res.status(500).json({
        error:
          "unauthorized u need to be the owner of this note to be able to delete",
      });
    }

    const deletedNoteTags = await note.getTags();

    for (const tag of deletedNoteTags) {
      const tagNotes = await tag.getNotes();
      const isTagOrphan = tagNotes.length === 1; // If there's only this note, it will become orphaned

      if (isTagOrphan) {
        // Only destroy orphan tags with no parent note
        await tag.destroy();
      }
    }
    await note.destroy();

    res.status(200).json({ message: "note deleted succesfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong please try again !" });
  }
};
