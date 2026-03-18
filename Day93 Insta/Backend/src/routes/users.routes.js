const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.post(
  "/follow/:userName",
  identifyUser,
  userController.followUserController,
);

userRouter.post(
  "/unfollow/:userName",
  identifyUser,
  userController.unfollowUserController,
);
module.exports = userRouter;
