const { Router } = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/set-name', auth, async (req, res) => {
  try {
    const { name } = req.body

    await User.updateOne({ _id: req.user.userId }, { name: name })

    const user = await User.findById(req.user.userId)

    res.status(201).json(user)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/upload-avatar-data', auth, async (req, res) => {
  console.log(req.body)
  console.log(req.body)
  console.log(req.body)
})

router.put('/upload-avatar', auth, async (req, res) => {

  console.log(req.body)

  if (req.files.myFile) {
    var file = req.files.myFile
    var filename = file.name
    console.log(filename)
    file.mv('./uploads/avatars/' + 'user-avatar-' + req.body.userId + '.jpg', function(err){
      if (err) {
        res.send(err)
      } else {
        res.send("File Uploaded")
      }
    })
  }

  console.log(req.body)

})

module.exports = router
