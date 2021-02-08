const { Router } = require('express')
const config = require('config')
const BlogPost = require('../models/BlogPost')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const { check, validationResult } = require('express-validator')
const router = Router()

router.post(
  '/create',
  [
    check('heading', 'Введите заголовок вашего поста').isLength({
      min: 1,
    }),
    check('message', 'Минимальная длина содержимого поста 1 символ').isLength({
      min: 1,
    }),
  ], 
  auth, 
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректно заполнена форма поста',
      })
    }

    const {heading, message, date, owner}  = req.body



    const post = new BlogPost({heading, message, date, owner: req.user.userId});


    await post.save(function (err) {
      if (err) return console.log(err);
      // saved!
    })
    res.status(201).json({message: 'Ваш пост успешно опубликован'})
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post(
  '/delete/:id',
  auth, 
  async (req, res) => {
  try {

    await BlogPost.deleteOne({ _id: req.params.id });


    res.status(201).json({message: 'Ваш пост успешно удалён'})
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
