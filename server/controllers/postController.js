const Post = require("../models/Post");


// POST /api/posts: Create a new blog post
exports.createPost = async (req, res) => {
    const post = await Post.create({...req.body, user: req.user.id });
    res.status(201).json(post);
};

// GET /api/posts/:id: Get a specific blog post
exports.getMyPosts = async (req, res) => {
    const posts = await Post.find({ user: req.user.id }).populate("username", "email");
    res.status(200).json(posts);
};

// GET /api/posts: Get all blog posts
exports.getAllPosts = async (req, res) => {
    const posts = await Post.find().populate("username", "email");
    res.status(200).json(posts);
};

// PUT /api/posts/:id: Update an existing blog post
exports.updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
};

// DELETE /api/posts/:id: Delete a blog post
exports.deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.status(204).send();
};
