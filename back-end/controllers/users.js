const { ValidationError, where } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { SECRET_KEY } = require("../constants");

exports.getUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(id);

    //handling if there is no user
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }

    const { password, ...userData } = user.toJSON();
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "invalid token" });
  }
};

exports.postLogin = async (req, res) => {
  // console.log(SECRET_KEY);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    // handling if the email isn't in the db
    if (!user) {
      res.status(404).json({ error: "email not found " });
      return;
    }

    // handling if the password doesn't match
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "incorrect password" });
      return;
    }

    // generating token if the email exist and the password match
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    // additional data to be bassed when login
    const additonalData = {
      name: user.name,
      age: user.age,
      email: user.email,
    };
    res.status(200).json({ token, ...additonalData, message: "login succfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "login failed" });
  }
};

exports.postRegistration = async (req, res) => {
  try {
    console.log(req.body);
    const { email, name, age, bio, imageUrl, password } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : "";

    // handdling if the user already exsists
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(500).json({ error: "this email already registered" });
      return;
    }
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
      return res.status(500).json({ error: "Registration failed" });
    }
  }
};

exports.patchUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(id);

    //handling if there is no user
    if (!user) {
      res.status(404).json({ error: "user not found" });
      return;
    }

    user.update(req.body);

    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "patch failed" });
  }
};

exports.deleteUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(id);

    //handling if there is no user
    if (!user) {
      res.status(404).json({ error: "user not found" });
      return;
    }

    user.destroy();

    res.status(200).json({ message: "user removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "invalid token" });
  }
};
