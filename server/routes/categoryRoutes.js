const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById } = require("../controllers/categoryController");
const { authenticate, authorize } = require("../middleware/auth");

// POST /api/categories: Create a new category (protected)
router.post("/", authenticate, authorize(["admin", "editor"]), createCategory);

// GET /api/categories: Get all categories (protected)
router.get("/", authenticate, getAllCategories);

// GET /api/categories/:id: Get a specific category (protected + authorized)
router.get("/:id", authenticate, authorize(["admin", "editor"]), getCategoryById);

module.exports = router;
