const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const FeedbackMessage = require('../models/FeedbackMessage')
const router = Router()

router.post(
  '',
  [
    check('email', 'Некорректный email').isEmail(),
    check('message', 'Максимальная длина сообщения 2500 символов')
      .isLength({max: 2500}),
    check('name', 'Максимальная длина имени 50 символов')
      .isLength({max: 50})
  ], 
  async (req, res) => {
  try {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при отправке формы обратной связи'
      })
    }

    const {name, email, message} = req.body

    const fdbMsg = new FeedbackMessage({name, email, message})

    await fdbMsg.save()

    res.status(201).json({message: 'Сообщение отправлено'})

  } catch (e) {
    res.status(500).json({message: 'Ошибка отправки сообщения, попробуйте снова'})
  }
})

module.exports = router