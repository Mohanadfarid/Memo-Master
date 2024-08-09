const User = require("../models/user");

exports.getUser = (req, res) => {
  res.send("this is the  get user controller");
};

exports.postLogin = (req, res) => {
  res.send("this the post login controller");
};

exports.postRegistration = (req, res) => {
  res.send("this the registration controller");
};

exports.patchUser = (req, res) => {
  res.send("this is the patch user controller");
};

exports.deleteUser = (req, res) => {
  res.send("this is the delete uesr controller");
};
