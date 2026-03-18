const express = require("express")
const postController = require("../controllers/post.controller")
const indentifyUser = require("../middleware/auth.middleware")
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

postRouter = express.Router()

postRouter.post("/",upload.single("image"),indentifyUser,postController.createPostController)

postRouter.get("/",indentifyUser,postController.getPostController)

postRouter.get("/details/:postId",indentifyUser,postController.getPostDetailsController)

// @route GET /posts/like/:postId

postRouter.post("/like/:postId",indentifyUser,postController.likePostController)

postRouter.get("/feed",indentifyUser,postController.getFeedController)


module.exports = postRouter