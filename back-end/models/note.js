const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const Note = sequelize.define("Note", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "title cannot be null",
      },
      notEmpty: {
        msg: "title cannot be empty",
      },
    },
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "content cannot be empty",
      },
      notEmpty: {
        msg: "content cannot be empty",
      },
    },
  },
  status: {
    type: DataTypes.ENUM("todo", "done", "doing"),
    allowNull: false,
    defaultValue: "todo",
  },
});

module.exports = Note;
