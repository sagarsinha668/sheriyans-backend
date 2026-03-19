const router = require('express');
const { RegisterUserController,LoginUserController } = require('../controller/auth.controller');

const authRouter = router();

authRouter.post("/register", RegisterUserController);
authRouter.post("/login", LoginUserController);
authRouter.get("/login", );

module.exports = authRouter;