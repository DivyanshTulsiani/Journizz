const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')

//imporrt the routes that u have created
const userRoutes = require("./routes/users")
const journalRoutes = require("./routes/journals")

require('dotenv').config();

const app = express()

const MONGOOSE_URI = process.env.MONGOOSE_URI
const JWT_SECRET = process.env.JWT_SECRET


app.use(express.json())
app.use(cors())



//for now i am using app only will shift to making proper routes in future

//enable userroutes no need to mention any routes here they are basically encapsularteed inside thsi or say traffic is diverted to user route from here 
//this helps in modularity and clean code
app.use(userRoutes)

app.use(journalRoutes)






app.listen(3000,async function(){
  try{
    await mongoose.connect(MONGOOSE_URI)
  }
  catch(e){
    console.log(e.message);
  }

})