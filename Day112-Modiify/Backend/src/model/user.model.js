const mongoose = require("mongoose");
const { use } = require("react");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "user name required"],
    unique: [true, "user name must be unique"],
  },
  email: {
    type: String,
    require: [true, "email required"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    require: [true, "password required"],
  },
});



const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
