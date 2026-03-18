const { File } = require("node:buffer");
const { toFile } = require("@imagekit/nodejs");
globalThis.File = File;
const jwt = require("jsonwebtoken");
const imageKit = require("@imagekit/nodejs");
const postRouter = require("../routes/post.routes");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const userModel = require("../models/users.model")

const imagekitInstance = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  // const {caption,imgUrl} = req.body
  console.log(req.body, req.file);
  const file = await imagekitInstance.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "insta_clone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}
async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(201).json({
    message: " user post fetched successfully",
    posts,
  });
}
async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not Found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }
  return res.status(200).json({
    message: "details",
    post,
  });
}
async function likePostController(req, res) {
  const userName = req.user.userName;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not Found",
    });
  }

  const isPostAlreadyLiked = await likeModel.findOne({
    user: userName,
    post: postId,
  });

  if (isPostAlreadyLiked) {
    await likeModel.findByIdAndDelete(isPostAlreadyLiked._id);
    return res.status(200).json({
      message: "Unlike Successfully",
    });
  }

  const like = await likeModel.create({
    user: userName,
    post: postId,
  });

  res.status(201).json({
    message: "post liked successfully",
    like,
  });
}

async function getFeedController(req,res){
 const post = await postModel.find().populate("user")

 res.status(200).json({
  message:"Getting All Post",
  post
 })
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getFeedController
};
