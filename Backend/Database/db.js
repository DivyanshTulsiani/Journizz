const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const User = new Schema({
  email: {type: String, unique: true},
  password: String,
  name: String,
  username: {type: String, unique: true}

})


//very imp the userId in th journal schema
//yeh wali id basically huamre liye identif kregi
//ki kaunsa journal kiska hai har ek user ki ek alg
//id generate hojati hai mongodb mai

//jab hum new user create krte hai tab hi ek id 
//waha populate hojati hai jab auth krke journal route mai koi aaega
//tab uske journal mai hum uski UserId bhi bhardenge


const Journal = new Schema({
  description: String,
  bookmark: Boolean,
  date: String,
  userId: ObjectId
})



const UserModel = mongoose.model('users',User)
const JournalModel = mongoose.model('journals',Journal)

module.exports = {
  UserModel: UserModel,
  JournalModel: JournalModel
}