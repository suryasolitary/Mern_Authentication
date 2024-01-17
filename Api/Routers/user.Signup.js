import express from "express"
import { Google, Signin, signUp,Signout } from "../controllers/authController.js"

const router = express.Router()
router.post("/signup",signUp)
router.post("/signin",Signin)
router.get("/signout",Signout)
router.post("/google",Google)
export default router

