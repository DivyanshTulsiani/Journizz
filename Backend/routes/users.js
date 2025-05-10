const { Router } = require('express')

const router = Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const bcrypt = require('bcrypt')
const { z } = require('zod')

require('dotenv').config();

// router.use(Router.json())

const Authmiddleware = require("../Authentication/auth")

const {UserModel,JournalModel} = require("../Database/db")

const JWT_SECRET = process.env.JWT_SECRET


router.get('/health',async function (req,res) {
  res.status(200).send("It is healthy")
  
})

router.post('/signup',async function(req,res){

  if(req.body.username && req.body.name && req.body.email && req.body.password){

    let newusername = req.body.username
    let userfound = await UserModel.findOne({username: newusername})

    if(!userfound){
      const requiredBody = z.object({
        email: z.string().min(5).max(100).email(),
        password: z.string().min(6).max(100),
        name: z.string().min(3).max(100),
        username: z.string().min(3).max(100)
      })

      const parsedDataSuccess = requiredBody.safeParse(req.body)
      if(!parsedDataSuccess.success){
        res.json({
          message: "Incorrect format",
          error: parsedDataSuccess.error
        })
      }


      else{
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name
        const username = req.body.username
        //hashing password from here
  
      
        try{
          const hashedpassword = await bcrypt.hash(password,5)
          await UserModel.create({
            email: email,
            password: hashedpassword,
            name: name,
            username: username
          })
        }
        catch(e){
          res.status(500).json({
            message: "Internal server failed. Data was not saved",
            error: e
          })
        }
      
      
        res.status(200).json({
          message: "You have signed up"
        })
      }

    }

    else{
      // alert("User already exists")
      console.log(userfound)

      res.status(404).json({
        message: "User already exists"
      })
    }

  }
  else{
    // alert("Please provide all credentials")

    res.json({
      message: "Please provide all credentials"
    })
  }


})


router.post('/signin',async function(req,res){
  const username = req.body.username
  const password = req.body.password

  if(username && password){
    try{
      let founduser = await UserModel.findOne({
        username: username
      })
      if(!founduser){
        res.status(404).json({
          message: "User does not exist"
        })
      }
      const passwordmatch = await bcrypt.compare(password,founduser.password)
      if(founduser && passwordmatch){
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
    catch(e){

    }

  }

  else{
    res.status(404).json({
      message: "Please enter valid credentials"
    })
  }



})


//ab hum nya page to frontend se hi bhejte hai to request validate
//krne ka ek trika hai ki pehle user jab frontend se hume call kregatab
//hum ek /me endpoint se check krle token

//par eventually jab hum uske baki journal access krenge tab bhi auth to hoga hi 
//to ye step optional aur redundant hai


router.get('/validate',Authmiddleware,function(req,res){
  const username = req.username

  //agr auth ne next call kiya mtlb thik hai iske baad redirect krdenge
  //par vo fe se hoga to res bhjenge

  if(username){
    res.status(200).json({
      message: "Verified"
    })
  }


})

//now these are get requests basically jab user signin krlega
//to use dashboard wale page pe redirect krenge window.lo.href use krke
//usse by default get request call hojati hai

router.get('/dashboard',function(req,res){
  
  res.sendFile(path.join(__dirname,"../../Public/dashboard.html"))

  
})

router.get('/getname',Authmiddleware,async function(req,res){

  const username = req.username

  let user = await UserModel.findOne({
    username: username
  })

  if(user){
    res.json({
      name: user.name,
      username: username
    })
  }
})









module.exports = router