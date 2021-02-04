const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
