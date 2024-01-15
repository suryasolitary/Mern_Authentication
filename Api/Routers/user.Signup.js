import express from "express"
import { Signin, signUp } from "../controllers/authController.js"

const router = express.Router()
router.post("/signup",signUp)
router.post("/signin",Signin)
export default router

