import User from "../models/UserSchema.js"
import bcrypt from "bcryptjs"
import { errorMessage } from "../utils/error.js"
import  Jwt  from "jsonwebtoken"
//import Auth from '../../client/src/components/Auth.jsx'

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

export const Signin = async (req,res,next) => {
   const {email,password} = req.body;
   try{
      const validuser = await User.findOne({email});
      if(!validuser){
         return next(errorMessage(404,"User not found"))
      }
      const ValidPassword = bcrypt.compareSync(password,validuser.password)
      if(!ValidPassword){
         return next(errorMessage(401,"Invalid Credentials"))
      }
      //console.log(validuser)
      //console.log(ValidPassword)
      const Token = Jwt.sign({id:validuser._id}, process.env.JWT_SECRET)
      const {password:hasedPassword ,...rest} = validuser._doc;
      const expiredDate = new Date(Date.now() + 3600000)
      res.cookie("Access_token",Token, {httpOnly:true, expires:expiredDate}).status(200).json(rest)
   }catch(err){
      next(err)
   }
}


export const Google = async(req,res,next)=>{
  try{
   const user = await User.findOne({email:req.body.email})
   if(user){
      const Token = Jwt.sign({id: user._id },process.env.JWT_SECRET)
      const { password : hashedPassword,...rest} = user._doc
      const expireDate = new Date(Date.now()+3600000)
      res.cookie("Access_token",Token,{httpOnly:true , expires:expireDate} ).status(200).json(rest);
   }else{
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hasPassword = bcrypt.hashSync(generatePassword,10);
      const Newuser = new User({
         username:req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random()*10000),
         email:req.body.email,
         password:hasPassword,
         ProfilePic:req.body.photo
      })
      //console.log(Newuser)
      await Newuser.save();
      const Token = Jwt.sign({id:Newuser._id},process.env.JWT_SECRET);
      const {password:hasedPassword ,...rest} = Newuser._doc;
      const expireDate = new Date(Date.now()+3600000);
      res.cookie("Access_token",Token,{httpOnly:true ,expires:expireDate}).status(200).json(rest)
   }
}catch(err){
   next(err)
}
}












