const { Router } = require('express')
const config = require('config')
const BlogPost = require('../models/BlogPost')
const Comment = require('../models/Comment')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const { check, validationResult } = require('express-validator')
const router = Router()

router.post(
  '/create',
  [
    check('message', 'Минимальная длина содержимого комментария 1 символ').isLength({
      min: 1,
    })
  ], 
  auth, 
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректно заполнена форма комментария',
      })
    }

    const { message, date, blogPostRef, owner}  = req.body



    const comment = new Comment({ message, date, blogPostRef, owner: req.user.userId});

    await BlogPost.updateOne({_id: blogPostRef}, { $push: { comments: comment._id} })

    await comment.save(function (err) {
      if (err) return console.log(err);
      // saved!
    })
    res.status(201).json({message: 'Ваш комментарий успешно опубликован'})
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post(
  '/delete/:id',
  auth, 
  async (req, res) => {
  try {

    await Comment.deleteOne({ _id: req.params.id });


    res.status(201).json({message: 'Ваш пост успешно удалён'})
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get(
  '/getComment/:id',
  auth, 
  async (req, res) => {
  try {

    const comment = await Comment.findById(req.params.id)


    res.status(201).json(comment)
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
    const comments = await Comment.find({ owner: req.params.id })
    res.json(comments)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
