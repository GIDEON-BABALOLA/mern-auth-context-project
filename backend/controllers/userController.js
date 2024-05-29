const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const  { cloudinaryUpload } = require("../utils/cloudinary")
//login user
const createToken =(_id) => {
    const token = jwt.sign({_id : _id}, process.env.JWT_SECRET, {expiresIn : "3d" }) //three arguments
    return token;
}
const loginUser = async(req, res) => {
    const  { email, password} = req.body;
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        user.accessToken = token
        await user.save()
        res.cookie("accessToken", token, {httpOnly : true, maxAge :   60 * 60 * 1000 * 24 * 3,   sameSite: "None", secure : "true"  })
        res.status(200).json({email, token, picture : user.picture})
            }catch(err){
        res.status(400).json({error : err.message})
            }

}
//signup user
const signupUser = async(req, res) => {
    const { email, password} = req.body;
    try{
        let picture = { url : null};
        if(req.files.length !== 0){
         picture = await cloudinaryUpload(req.files[0].path, `${email}`) //This will return a cloudinary url for the picture
         fs.unlinkSync(req.files[0].path)
        }
const user = await User.signup(email, password, picture.url)
const token = createToken(user._id)
user.accessToken = token
await user.save()
res.cookie("accessToken", token, {httpOnly : true, maxAge :   60 * 60 * 1000 * 24 * 3,   sameSite: "None",  secure : "true"  })
res.status(200).json({email, token, picture: user.picture})
    }catch(err){
console.log(err.message)
res.status(400).json({error : err.message})
    }
}
const logoutUser = async(req, res) => {
    const cookies = req.cookies
    if(!cookies.accessToken){
        return res.status(404).json({"error": "No accessToken in cookies", "success" : false})
    }
    try{
        const accessToken = cookies.accessToken;
        const user = await User.findOne({accessToken})
        if(!user){
            res.clearCookie("accessToken", {httpOnly: true, secure : true})
            return res.sendStatus(204)
        }
        user.accessToken = ""
        await user.save();  
        res.clearCookie("accessToken", {httpOnly: true, secure : true})
        return res.sendStatus(204)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}
const getUser = async(req, res) => {
    try{
        const { _id } = req.user
 const user = await User.findOne({_id})
 res.status(200).json(user)
    }catch(err){
        res.status(400).json({error : err.message})
    }
}
const addPicture = async(req, res) => {
    console.log("Gideon is here")
    try{
const { _id } = req.user
const user =  await User.findOne({_id})
const picture = await cloudinaryUpload(req.files[0].path, `${user.email}`)
fs.unlinkSync(req.files[0].path) //delete the image from server
user.picture = picture.url;
await user.save()
res.status(200).json({email: user.email, token : user.token, picture: user.picture})
    }catch(err){
        console.log(err)
        res.status(400).json({error: err.message})
    }
}
module.exports = { signupUser, loginUser, logoutUser, getUser, addPicture}
