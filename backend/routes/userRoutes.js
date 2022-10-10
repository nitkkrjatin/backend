const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router.post('/', registerUser).get('/', protect, admin, getUsers)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router
