const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("memo-master", "root", "nody1234", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize