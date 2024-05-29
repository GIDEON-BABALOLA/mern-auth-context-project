const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const requireAuth = async (req, res, next) => {
    //verify authentication
    let token;
 if(req.headers.authorization || req.cookies.accessToken){
   switch (req.headers.authorization || req.cookies.accessToken) {
    case req.headers.authorization:
       token = req.headers.authorization.split(" ")[1] 
       break;
    default:
       token = req.cookies.accessToken
       break;
 }
 }
   //   if(!accessToken && !authorization){
   //      return res.status(401).json({error : "Authorization token required"})
   //   }
   //   const token = authorization.split(" ")[1] || accessToken
try{
 const { _id } = jwt.verify(token, process.env.JWT_SECRET) //returns the payload from the token
req.user = await User.findOne({_id}).select("_id") //select makes sure that only the _id of the user is sent to req.user
next();
}catch(err){
console.log(err.message)
res.status(401).json({error : 'Request is not authorized'})
}
}
module.exports = requireAuth