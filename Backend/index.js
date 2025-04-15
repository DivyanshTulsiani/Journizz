const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')

//imporrt the routes that u have created
const userRoutes = require("./routes/users")

require('dotenv').config();

const app = express()

const MONGOOSE_URI = process.env.MONGOOSE_URI
const JWT_SECRET = process.env.JWT_SECRET


app.use(express.json())
app.use(cors())



//for now i am using app only will shift to making proper routes in future

app.use(userRoutes)






app.listen(3000,async function(){
  try{
    await mongoose.connect(MONGOOSE_URI)
  }
  catch(e){
    console.log(e.message);
  }

})