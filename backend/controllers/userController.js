const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST/api/users
//  @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, department, contactNumber, joiningDate } =
    req.body
  if (
    !name ||
    !email ||
    !password ||
    !department ||
    !contactNumber ||
    !joiningDate
  ) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  //check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  //create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    department,
    contactNumber,
    joiningDate,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      contactNumber: user.contactNumber,
      joiningDate: user.joiningDate,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User')
  }
})
// @desc Authenticate a user
// @route POST/api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      isAdmin: user.isAdmin,
      contactNumber: user.contactNumber,
      joiningDate: user.joiningDate,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credential')
  }
})
// @desc Get user data
// @route GET/api/users/me
//  @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

//@desc Get users
//@route GET /api/users
//@access Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(201).json(users)
})

//Generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
}
