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
    unique:{
      msg:'the content must be uniqe'
    },
  },
});

module.exports = Tag;
