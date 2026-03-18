const mongoose = require("mongoose"); // Importing the Mongoose library for MongoDB interactions
const { CgPassword } = require("react-icons/cg");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: [true, "userName already exists"], // Ensuring that the userName is unique in the database,
    default: "user",
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
    require: true,
  },
  password: {
    type: String,
    required: true,
    select:false,
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/rr9wraes2/default%20users.jpg",
  },
});

const userModel = mongoose.model("users", userSchema); // Creating a Mongoose model named "User" based on the defined schema

module.exports = userModel; // Exporting the User model for use in other parts of the application
