const { Router, response } = require('express')

const router = Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const { GoogleGenAI } = require('@google/genai');

dotenv.config()     
const Authmiddleware = require("../Authentication/auth")


const GEMINI_KEY = process.env.GEMINI_KEY

router.get('/getsuggestion',async function(req,res){


  const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "My day was fine i went on to a school trip with my school friends and we enjoyed a lot",
      config: {
        systemInstruction: "You are a helper and you have to improve the vocabulary and language for giving suggestions",
      },
    });
    console.log(response.text);
    res.json({
      suggestion: response.text
    })
  }


  
  main();


})


module.exports = router