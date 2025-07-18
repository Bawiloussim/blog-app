const express = require("express");
const {
    createPost,
    getMyPosts,
    getAllPosts,
    updatePost,
    deletePost,
} = require("../controllers/postController");
const { authenticate, authorize } = require("../middleware/auth");
const router = express.Router();

// POST /api/posts : protégé, nécessite authentification
router.post("/", authenticate, createPost);

// GET /api/posts/me : protégé, utilisateur authentifié
router.get("/me", authenticate, getMyPosts);

// GET /api/posts : protégé, utilisateur authentifié
router.get("/", authenticate, getAllPosts);

// PUT /api/posts/:id : protégé + autorisation selon rôle (exemple ici admin et editor)
router.put("/:id", authenticate, authorize(["admin", "editor"]), updatePost);

// DELETE /api/posts/:id : protégé + autorisation admin uniquement
router.delete("/:id", authenticate, authorize(["admin"]), deletePost);

module.exports = router;
