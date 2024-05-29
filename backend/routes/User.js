const express = require("express")
const router = express.Router()
const { signupUser, getUser, loginUser, logoutUser, addPicture} = require("../controllers/userController")
const { uploadMiddleware } = require("../middleware/uploadImages")
const requireAuth = require("../middleware/requireAuth")
//login Route
router.post("/login", loginUser)
//Signup route
router.post("/signup", uploadMiddleware, signupUser)
//getUser route
router.get("/get-user", requireAuth, getUser)
//logout route
router.get("/logout", logoutUser)
//Add picture
router.patch("/add-picture", requireAuth, uploadMiddleware, addPicture)
module.exports = router
