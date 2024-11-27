const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-__v');
  res.json(users);
});

exports.createUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  const newUser = await user.save();
  res.status(201).json(newUser);
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-__v');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).select('-__v');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ message: 'User deleted successfully' });
});