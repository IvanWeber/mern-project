const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String},
  links: [{type: Types.ObjectId, ref: 'Link'}],
  blogPosts: [{type: Types.ObjectId, ref: 'BlogPost'}]
})

module.exports = model('User', schema)