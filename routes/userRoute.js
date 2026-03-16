const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
						
const { verify, verifyAdmin, isLoggedIn} = require("../auth")


// add router here ------------------------------------

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/details", verify, isLoggedIn, userController.getDetails);


module.exports = router;