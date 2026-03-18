const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "user id is required to make post"],
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true,"user id is required for creating post"]
  }
});

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel