
 export  async function registerController(req, res,next) {
    
    try{
        throw new Error("Password Is Weak")
    }catch(err){
        err.status = 400
        next(err)
    }


}