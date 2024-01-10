import User from "../models/UserSchema.js"
import bcrypt from "bcryptjs"
import { errorMessage } from "../utils/error.js"

export const signUp = async (req,res,next) =>{
   //console.log(req.body)
   const {username, email, password} = req.body
   const bcryptData = bcrypt.hashSync(password,10)
   const newuser = new User({username, email, password:bcryptData })
   //console.log(newuser)
  try{
      await newuser.save()
      res.status(201).json({message:"user Data created"})
  }catch(err){
     next(err)
  }
}
