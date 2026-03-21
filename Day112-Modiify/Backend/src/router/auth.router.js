const router = require("express");
const {
  RegisterUserController,
  LoginUserController,
  getMeController,
  logoutController
} = require("../controller/auth.controller");
const authUser = require("../middleware/user.middleware");

const authRouter = router();

authRouter.post("/register", RegisterUserController);
authRouter.post("/login", LoginUserController);
authRouter.get("/get-me", authUser, getMeController);
authRouter.get("/logout", logoutController);

module.exports = authRouter;
