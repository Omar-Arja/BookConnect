const express = require("express")
const router = express.Router()
const userController = require("../controllers/users.controller")
const searchController = require("../controllers/search.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/register", userController.register)
router.post("/toggle-follow/:userId", authMiddleware, userController.toggleFollowUser)
router.get("/search", authMiddleware, searchController.searchUsers)

module.exports = router