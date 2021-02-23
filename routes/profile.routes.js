const { Router } = require('express')
const config = require('config')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()
let fs = require('fs');


router.get('/avatar/:id', auth, async (req, res) => {
  try {
    const avatarSrcUrl = __dirname + '/../uploads/avatars/' + 'user-avatar-' + req.params.id + '.jpg'
    const avatarDistUrl = __dirname + '/../client/src/img/user-avatar.jpg'

    const avatarAnonymousSrcUrl = __dirname + '/../img/anonymous-avatar.jpg'

    if (fs.existsSync(avatarSrcUrl)) {
      fs.copyFile(avatarSrcUrl, avatarDistUrl, (err) => {
        if (err) throw err;
        console.log('source.jpg was copied to destination.jpg');
      });
  
      res.status(200).json({message: 'Аватар загружен'})
    } else {
      fs.copyFile(avatarAnonymousSrcUrl, avatarDistUrl, (err) => {
        if (err) throw err;
        console.log('source.jpg was copied to destination.jpg');
      });
      res.status(200).json({message: 'Аватар загружен'})
    }

    

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

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