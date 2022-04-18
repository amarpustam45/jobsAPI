const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// const register = async (req, res) => {
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

const register = async (req, res) => {
  //create the user using mongoose
  const user = await User.create({ ...req.body });

  //create the web token for the user --this can be done in the models using the methods instance
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password!');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  //compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
