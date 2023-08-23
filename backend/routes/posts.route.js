const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./storage/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", authMiddleware, postsController.getFeed);
router.post("/", authMiddleware ,upload.single("pic"), postsController.createPost);
router.post("/:postId/toggle-like", authMiddleware, postsController.toggleLikePost);

module.exports = router;
