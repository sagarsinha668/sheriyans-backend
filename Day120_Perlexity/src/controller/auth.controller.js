import User from "../models/user.model.js";
import { sendMail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import userModel from "../models/user.model.js";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email or username",
      });
    }
    // Create new user
    const newUser = new User({
      username,
      email,
      password,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    await sendMail({
      to: email,
      subject: "Welcome to our platform!",
      html: `<h1>Welcome, ${username}!</h1>
      <p>Thank you for registering on our platform. We're excited to have you on board!</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>`,
    });

    await newUser.save();

    // Return success response (without password)
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      verified: newUser.verified,
      createdAt: newUser.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.verified = true;
    await user.save();
   const html = `
    <h1> Email Verification Successfully </h1>
    <p> Touch here 👇 to Login </p>
    <a href="http://localhost:3000/api/auth/login"> Touch Me </a>
    `
    res.send(html)
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message:
          "Email not verified. Please verify your email before logging in.",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);


    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMe = async (req,res)=>{
  const userId = req.user.id
  const user = await userModel.findOne({userId}).select("-password")

  if(!user){
    return res.status(401).json({
      message:"User Not Found"
    })
  }

  res.status(200).json({
    message:"user founded",
    user
  })
}