const express = require("express");
const sequelize = require("./config");
const User = require("./models/user");
const Note = require("./models/note");
const Tag = require("./models/tag");

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    // one to many relation between note and user
    User.hasMany(Note);
    Note.belongsTo(User);

    // many to many relation between note and tag
    Note.belongsToMany(Tag, { through: "NoteTag" });
    Tag.belongsToMany(Note, { through: "NoteTag" });

    await sequelize.sync(); // Use await to handle the promise
    app.listen(port, () => {
      console.log(`The server is up and running at http://localhost:${port}/`);
    });
  } catch (error) {
    console.error("Connection to DB failed. Please try again.", error); // Log the actual error
  }
};

startServer();
