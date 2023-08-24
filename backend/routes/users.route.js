const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/register", userControllers.register)
router.post("/toggle-follow/:userId", authMiddleware, userControllers.toggleFollowUser)

module.exports = router