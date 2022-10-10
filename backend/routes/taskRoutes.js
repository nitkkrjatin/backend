const express = require('express')
const router = express.Router()

const { setTask, getTasks } = require('../controllers/taskController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTasks).post(protect, setTask)

module.exports = router
