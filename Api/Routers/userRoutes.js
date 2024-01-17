import express from "express"
import {text, updateUser,deleteUser} from "../controllers/user.controller.js"
import { VerifyUser } from "../utils/VerifyUser.js"

const router = express.Router()

router.get('/',text)
router.post('/update/:id',VerifyUser,updateUser)
router.delete('/delete/:id',VerifyUser,deleteUser)
export default router
