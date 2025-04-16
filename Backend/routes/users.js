const { Router } = require('express')

const router = Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

require('dotenv').config();

// router.use(Router.json())

const {UserModel,JournalModel} = require("../Database/db")

const JWT_SECRET = process.env.JWT_SECRET

router.post('/signup',async function(req,res){

  if(req.body.username && req.body.name && req.body.email && req.body.password){

    let newusername = req.body.username
    let userfound = await UserModel.findOne({username: newusername})

    if(!userfound){
      const email = req.body.email
      const password = req.body.password
      const name = req.body.name
      const username = req.body.username
    
      try{
        await UserModel.create({
          email: email,
          password: password,
          name: name,
          username: username
        })
      }
      catch(err){
        return res.status(500).json({
          message: "Internal server failed. Data was not saved",
          error: err
        })
      }
    
    
      res.status(200).json({
        message: "You have signed up"
      })
    }

    else{
      // alert("User already exists")

      res.status(404).json({
        message: "User already exists"
      })
    }

  }
  else{
    alert("Please provide all credentials")

    res.json({
      message: "Please provide all credentials"
    })
  }


})


router.post('/signin',async function(req,res){
  const username = req.body.username
  const password = req.body.password

  if(username && password){
    let founduser = await UserModel.findOne({
      username: username
    })
  
    if(founduser && founduser.password === password){
      const token = jwt.sign({
        username: username
      },JWT_SECRET)
  
      res.status(200).json({
        message: "Succesfully signed in",
        token: token
      })
    }

    else{
      res.status(404).json({
        message: "Wrong username or password"
      })
    }
  }

  else{
    res.status(404).json({
      message: "Please enter valid credentials"
    })
  }



})


//now these are get requests basically jab user signin krlega
//to use dashboard wale page pe redirect krenge window.lo.href use krke
//usse by default get request call hojati hai

router.get('/dashboard',function(req,res){
  
  res.sendFile(path.join(__dirname,"../../Public/dashboard.html"))

  
})











module.exports = router