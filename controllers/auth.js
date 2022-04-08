const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors/bad-request');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  // //check for if the value is present when registering
  // const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide a name, email and password!');
  // }

  //All of this can be setup in the schema
  // //create new user with hashed password
  // const { name, email, password } = req.body;

  // //get random bytes to hash the password with
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempUser = { name, email, password: hashedPassword };

  //create the user using mongoose
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
