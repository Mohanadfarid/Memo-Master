const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const Tag = sequelize.define("Tag", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
  },
});

module.exports = Tag;
