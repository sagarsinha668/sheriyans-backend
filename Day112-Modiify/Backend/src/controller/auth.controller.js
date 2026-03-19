const usermodel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUserController = async (req, res) => {
  const { username, email, password } = req.body;

  const isRegistered = await usermodel.findOne({
    $or: [{ username }, { email }],
  });

  if (isRegistered) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await usermodel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

const LoginUserController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await usermodel.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

const getMeController = async (req, res) => {
    
}
module.exports = {
  RegisterUserController,
  LoginUserController,
};
