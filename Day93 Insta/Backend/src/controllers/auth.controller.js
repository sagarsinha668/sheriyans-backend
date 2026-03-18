const userModel = require("../models/users.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { userName, email, password, bio, profileImage } = req.body;

  const isUserPresent = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (isUserPresent) {
    return res.status(400).json({
      message:
        "userName or email already exists" +
        (isUserPresent.email === email
          ? "email already presetn"
          : "userName already present"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    userName,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "user successfully created",
    user: {
      name: user.userName,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { userName, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        userName: userName,
      },
      {
        email: email,
      },
    ],
  }).select("+password");

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const isPasswordValid = hash == user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password is incorrect",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user created",
    user: {
      name: user.userName,
      email: user.email,
      bio: user.bio,
    },
  });
}

async function getMeController(req, res) {
  const user = req.user.userName;

  const userDetails = await userModel.findOne({ userName: user });
  res.status(200).json({
    message: "user details retrieved",
    user: userDetails,
  });
}

module.exports = {
  registerController,
  loginController,
  getMeController,
};
