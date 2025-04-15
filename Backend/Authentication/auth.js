const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const {UserModel} = require('../Database/db')



async function Authmiddleware(req,res,next){
  const token = req.headers.authorization;

  if(token){
    try{
      const decodedData = jwt.verify(token,JWT_SECRET)
      //our auth function decodes the jwt and extrats the username
      //it then sends this username further by modyfying req res obj

      const newusername = decodedData.username
      let userfound = await UserModel.findOne({username: newusername})

      //agr user ekdam pkaa milgya aur verify hogya
      //to usko aage jane do aur next functuo ki bhi username dedo

      if(userfound){
        req.username = newusername
        next()
      }
      else{
        res.status(404).json({
          message: "Unable to find the requested user"
        })
      }
    }
    catch(e){
      res.status(401).json({
        message: "Some error occured Unable to verify",
        error: e
      })
    }
  }

  else{
    res.status(302).send({
      message: "Token not found"
    })
  }
}

module.exports = Authmiddleware;