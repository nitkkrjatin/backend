const asyncHandler = require('express-async-handler')

const Task = require('../models/taskModel')

//@desc set task
//@route POST/api/tasks
//@access PRIVATE
const setTask = asyncHandler(async (req, res) => {
  if (
    !req.body.description ||
    !req.body.type ||
    !req.body.startTime ||
    !req.body.timeTaken
  ) {
    res.status(400)
    throw new Error('Please fill all the fields')
  }

  const task = await Task.create({
    description: req.body.description,
    user: req.user.id,
    type: req.body.type,
    startTime: req.body.startTime,
    timeTaken: req.body.timeTaken,
  })
  res.status(200).json(task)
})

//@desc Get Tasks
// @route GET/api/tasks
//@access PRIVATE
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id })

  res.status(201).json(tasks)
})

module.exports = {
  getTasks,
  setTask,
}
