const {Schema, model} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true},
  message: {type: String, required: true},
})

module.exports = model('FeedbackMessage', schema)