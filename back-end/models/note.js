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
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("todo", "done", "doing"),
    allowNull: false,
    defaultValue: "todo",
  },
});

module.exports = Note;
