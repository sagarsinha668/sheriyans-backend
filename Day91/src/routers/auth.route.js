const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");


authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserPresent = await userModel.findOne({ email });
  if (isUserPresent) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const user = await userModel.create({
    email,
    password,
    name,
  });

  const token = jwt.sign({
    id: user._id,
    email: user.email
  }
, process.env.JWT_SECRET);

  res.cookie("jwt_token",token)
  res.status(201).json({
    message: "send user details successfull",
    user,
    token
  });
});

module.exports = authRouter;
