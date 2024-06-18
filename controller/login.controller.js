const { User } = require("../models/user");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");


exports.login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password invalid");

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Email or Password invalid");

  const token = user.generateAuthToken();
  res.send(token);
};
 function validate(req) {
      const schema = Joi.object({
          email: Joi.string().min(5).max(255).required().email(),
          password: Joi.string().min(5).max(1024).required(),
      });

      return schema.validate(req);
};