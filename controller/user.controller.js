const { User, validateUser } = require("../models/user");
// const mongoose = require("mongodb");
const _ = require("lodash");
const bcrypt = require("bcrypt");


exports.myself = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
};
exports.register = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("User already registered.");

  const user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateAuthToken();

  try {
    // Save the user to the database
    await user.save();

    // Respond with a success message and selected user properties
    res.header("x-auth-token", token).send({
      message: "Registration successful.",
      user: _.pick(user, ["name", "email"]), // Select name and email properties from user
    });
  } catch (err) {
    // Handle any errors that occur during user creation or saving
    console.error("Error saving user:", err);
    res.status(500).send("Failed to register user. Please try again later.");
  }
};