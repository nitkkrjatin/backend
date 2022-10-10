const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    type: {
      type: String,
      required: [true, 'Please add a type'],
    },
    startTime: {
      type: Date,
      required: [true, 'Please add a date'],
    },
    timeTaken: {
      type: Number,
      required: [true, 'Please add time taken'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Task', taskSchema)
