import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  contact: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^\+\d{10,15}$/,
      "Please provide a valid international contact number starting with +",
    ],
  },
  password: { type: String, required: true },
  fullname: { type: String, required: true, trim: true },
  role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const userModel = mongoose.model("User", userSchema);

export default userModel;
