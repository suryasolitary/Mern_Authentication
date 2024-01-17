import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from "./Routers/userRoutes.js"
import authRoutes from "./Routers/user.Signup.js"
import cookieParser from 'cookie-parser'
//import UserSchema from './models/UserSchema'
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connection to MongoDb")
}).catch((err)=>{
    console.log(err)
})
const app = express()
const port = 5000
app.use(express.json());
app.use(cookieParser());
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})

//App Routers 
app.get('/',(req,res)=>{
    res.json({
        message:"App Router"
    })
})

// Api Routers 
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})