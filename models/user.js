const mongoose = require('mongoose');
const Joi = require("joi");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.PRIVATE_KEY);
    return token;
}

    function validateUser(user) {
      const schema = Joi.object({
          name: Joi.string().min(5).max(50).required(),
          email: Joi.string().min(5).max(255).required().email(),
          password: Joi.string().min(5).max(1024).required(),
      });

      return schema.validate(user);
};

const User = mongoose.model('User', userSchema);
module.exports = {
  User,
  validateUser,
};