const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const User = new Schema({
  email: {type: String, unique: true},
  password: String,
  name: String,
  username: {type: String, unique: true}

})



const UserModel = mongoose.model('users',User)

module.exports = {
  UserModel: UserModel
}