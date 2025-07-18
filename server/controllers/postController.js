const Post = require("../models/Post");

// POST /api/posts: Create a new blog post
exports.createPost = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const post = await Post.create({ ...req.body, author: req.user.id });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/posts/me: Get posts of the logged-in user
exports.getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.id }).populate("author", "email");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/posts: Get all blog posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "email");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/posts/:id: Update an existing blog post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/posts/:id: Delete a blog post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
