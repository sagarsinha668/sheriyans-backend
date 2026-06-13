import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
  try {
    const { email, contact, password, fullname, role } = req.body;
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "This email or contact number is already registered",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
