import {Router} from "express"
import {registerController} from "../controller/auth.controller.js"

import { registerValidator } from "../validator/auth.validator.js"
const authRouter = Router()

authRouter.post("/register",
    registerValidator,
    registerController)

export default authRouter