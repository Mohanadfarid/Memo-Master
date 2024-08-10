const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "name cannot be empty",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "email must be a valid email address",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "password cannot be empty",
      },
    },
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      max: {
        args: 120,
        msg: "age cannot be greater than 120",
      },
      min: {
        args: 1,
        msg: "age must be at least 1",
      },
    },
  },
  bio: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
