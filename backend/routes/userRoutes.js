const express = require("express");
const { loginUser, registerUser, logOut, userDetails, getAdminUsers, assignTask, markAsRead, markall } = require("../controller/userController");
const { isAuthenticatedUser, forRoutineCheck } = require("../middleware/auth");
const router = express.Router();


// users

router.route("/auth/login").post(loginUser)
router.route("/auth/register").post(registerUser)
router.route("/auth/logout").get(logOut)

router.route("/auth/routine").get(forRoutineCheck, userDetails)
router.route("/mark").post(markAsRead)
router.route("/markall").post(markall)

// admin
router.route("/admin/getusers").get(getAdminUsers)
router.route("/admin/assign").post(assignTask)


module.exports = router;
