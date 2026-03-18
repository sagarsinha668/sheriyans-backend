const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserPresent = await userModel.findOne({ email });
  if (isUserPresent) {
    return res.status(400).json({
      message: `${email}, already register`,
    });
  }
  const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "new User created",
    user,
    token,
  });
});

authRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    const isUserPresent = await userModel.findOne({email});
    console.log(isUserPresent)
    if(!isUserPresent){
        return res.status(400).json({
            message: `${email} is not register, please register first`
        })
    }
    const passwordMatch = isUserPresent.password === crypto.createHash("md5").update(password).digest("hex");
    if(!passwordMatch){
        return res.status(400).json({
            message: `invalid credentials`
        })
    }   
    const token = jwt.sign(
        {
          id: isUserPresent._id,        
        },
        process.env.JWT_SECRET,
      );
    res.cookie("jwt_token", token);
    res.status(200).json({
        message: "login successful",
        token
    })
})

module.exports = authRouter;
