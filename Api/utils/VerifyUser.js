import { errorMessage } from "./error.js";
import  Jwt  from  "jsonwebtoken";

export const  VerifyUser =(req,res,next)=>{
   const token = req.cookies.Access_token;
   if(!token) return next(errorMessage(401,'You need to Login '))
   
   Jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
      if(err){
        return  next(errorMessage(403,'Token is not Valid '))
      }
      req.user = user;
      next()

   })
   
}