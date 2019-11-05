import jwt from "jsonwebtoken"
module.export = (req,res,next)=>{
    const authHeader = req.get('Authorization')
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; // gets token from auth header by splitting string
    if(!token || token == ''){
        req.isAuth = false;
        return next();
    }
    let decodedToken
    try{
        decodedToken = jwt.verify(token, 'somesupersecretkey')
    }catch(err){
        req.isAuth = false
        return next();
    }
    req.isAuth = true;
    req.userID = decodedToken.userID;
    next();
}