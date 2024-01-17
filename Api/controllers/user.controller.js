//import User from "../models/UserSchema.js"
import User from "../models/UserSchema.js"
import { errorMessage } from "../utils/error.js"
import bcrypt from "bcryptjs"

export const text = (req,res)=>{
    res.send("Router Routes Connection sucess ")
}

export const updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorMessage(401,'You can update only your Account...'));
    }
    try{
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10)
        }
        const UpdatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    ProfilePic:req.body.ProfilePic
                }
            },{new:true});
            //console.log(UpdatedUser)
            const { password, ...rest } = UpdatedUser._doc;
            res.status(200).json(rest)
    }catch(error){
        next(error)
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorMessage(401,`You can Delete only your Account...`))
    }
    try{
     await User.findByIdAndDelete(req.params.id)
     res.status(200).json(`User Account has been Deleted Successfully...`)
    }catch(err){
        next(err)
    }
}
