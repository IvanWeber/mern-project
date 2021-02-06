const { Router } = require('express')
const config = require('config')
const BlogPost = require('../models/BlogPost')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', auth, async (req, res) => {
  try {
    const {heading, message, date, owner}  = req.body



    const post = new BlogPost({heading, message, date, owner: req.user.userId});


    await post.save(function (err) {
      if (err) return console.log(err);
      // saved!
    })
    res.status(201).json({post})
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/user-id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    res.json(user._id)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const posts = await BlogPost.find({ owner: req.params.id })
    res.json(posts)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
