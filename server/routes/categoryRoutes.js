const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById } = require("../controllers/categoryController");
const { authenticate, authorize } = require("../middleware/auth");

// POST /api/categories: Create a new category
router.post("/", createCategory);

// GET /api/categories: Get all categories
router.get("/", getAllCategories, authenticate);

// GET /api/categories/:id: Get a specific category
router.get("/:id", getCategoryById, authenticate, authorize(["admin", "editor"]));

module.exports = router;
