const express = require('express')
const router = express.Router()

const { setTask, getTasks } = require('../controllers/taskController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, setTask)
router.route('/:id').get(protect, getTasks)

module.exports = router
