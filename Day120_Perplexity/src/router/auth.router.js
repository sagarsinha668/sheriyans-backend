import express from "express";
import { register,verifyEmail,login,getMe} from "../controller/auth.controller.js";
import {
  registerValidation,loginValidation} from "../validator/auth.validator.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register route with validation
router.post("/register", registerValidation, register);

// Email verification route
router.get("/verify-email",verifyEmail); 

// Login route can be 

router.post("/login",loginValidation, login);

// getme
router.get("/get-me",authMiddleware,getMe)



export default router;
