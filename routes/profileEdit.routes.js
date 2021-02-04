const { Router } = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/set-name', auth, async (req, res) => {
  try {
    const { name } = req.body

    await User.updateOne({_id: req.user.userId}, { name: name })

    const user = await User.findById(req.user.userId)

    res.status(201).json(user)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router