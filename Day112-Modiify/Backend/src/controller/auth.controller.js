const usermodel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")

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

  const user = await usermodel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");
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
  const user = await usermodel.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.status(200).json({
    message: "User fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

const logoutController = async (req, res) => {
  const token = req.cookies.token;
  res.clearCookie("token");
  redis.set(token, Date.now().toString());
  return res.status(200).json({
    message: "Logout successful",
  });
};

module.exports = {
  RegisterUserController,
  LoginUserController,
  getMeController,
  logoutController,
};
