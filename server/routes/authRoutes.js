const express = require("express");
const {signup, login} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup); // POST /api/auth/signup
router.post("/login", login); // POST /api/auth/login

module.exports = router;
