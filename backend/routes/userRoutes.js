const express = require("express");
const { loginUser, registerUser, logOut, userDetails } = require("../controller/userController");
const { isAuthenticatedUser, forRoutineCheck } = require("../middleware/auth");
const router = express.Router();


// users

router.route("/auth/login").post(loginUser)
router.route("/auth/register").post(registerUser)
router.route("/auth/logout").get(logOut)

router.route("/auth/routine").get(forRoutineCheck, userDetails)
// admin


module.exports = router;
