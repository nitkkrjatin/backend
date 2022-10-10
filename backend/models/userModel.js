const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    department: {
      type: String,
      required: [true, 'Please add a department'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Please add Contact Number'],
    },
    joiningDate: {
      type: Date,
      required: [true, 'Please add Joining date'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
