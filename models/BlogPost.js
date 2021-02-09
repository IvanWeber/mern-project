const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  heading: {type: String, required: true, unique: false},
  message: {type: String, required: true, unique: false},
  date: {type: Date, default: Date.now(), unique: false},
  comments: [{type: Types.ObjectId, ref: 'Comment'}],
  owner: {type: Types.ObjectId, ref: 'User', unique: false}
})

module.exports = model('BlogPost', schema)