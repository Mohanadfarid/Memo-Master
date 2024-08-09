const { ValidationError } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.getUser = (req, res) => {
  res.send("this is the  get user controller");
};

exports.postLogin = (req, res) => {
  res.send("this the post login controller");
};

exports.postRegistration = async (req, res) => {
  try {
    console.log(req.body);
    const { email, name, age, bio, imageUrl, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      name,
      age,
      bio,
      imageUrl,
      password: hashedPassword,
    });
    res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    // handling validation errors
    if (error instanceof ValidationError) {
      const { errors } = error;
      let formatedErrors = {};

      errors.forEach((err) => {
        console.log(formatedErrors);
        formatedErrors[err.path] = err.message;
      });

      console.log(error);
      res.status(500).json({ error: "validation errors", ...formatedErrors });
    } else {
      // generac error
      console.log(error);
      res.status(500).json({ error: "Registration failed" });
    }
  }
};

exports.patchUser = (req, res) => {
  res.send("this is the patch user controller");
};

exports.deleteUser = (req, res) => {
  res.send("this is the delete uesr controller");
};
