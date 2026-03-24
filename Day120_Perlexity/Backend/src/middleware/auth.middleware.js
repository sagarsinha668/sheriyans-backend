import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const token = req.cookies.token
  
  if(!token){
    return res.status(401).json({
        message:"unauthorized token",
        success:false,
        err:"no token provided"
    })
  }

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
  }catch(err){
    return res.status(401).json({
        message: "unauthorized"
    })
  }
  next()
}
