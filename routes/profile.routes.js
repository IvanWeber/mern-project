const { Router } = require('express')
const config = require('config')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    res.json(user)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router