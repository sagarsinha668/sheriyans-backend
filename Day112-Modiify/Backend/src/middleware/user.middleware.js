const usermodel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not Provided",
    });
  }
  const istokenBlacklisted = await redis.get(token);
  
  if (istokenBlacklisted) {
    return res.status(401).json({
      message: "Token is Blacklisted",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authUser;
