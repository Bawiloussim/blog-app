const express = require("express");
const {createPost, getMyPosts, getAllPosts, updatePost, deletePost} = require("../controllers/postController");
const {authenticate, authorize} = require("../middleware/auth");
const router = express.Router();

router.post("/", createPost); // POST /api/posts
router.get("/me", authenticate, getMyPosts); // GET /api/posts/me
router.get("/", authenticate, getAllPosts); // GET /api/posts
router.put("/:id", authenticate, authorize, updatePost); // PUT /api/posts/:id
router.delete("/:id", authenticate, authorize, deletePost); // DELETE /api/posts/:id

module.exports = router;
