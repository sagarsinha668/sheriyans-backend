import {Router} from "express"
import { validateRegisterUser  } from "../validator/auth.validator.js"
// import { register } from "../controller/auth.controller.js"

const router = Router()

router.post("/register", validateRegisterUser)

export default router 