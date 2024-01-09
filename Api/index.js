import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connection to MongoDb")
}).catch((err)=>{
    console.log(err)
})
const app = express()
const port = 5000
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})
