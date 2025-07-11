const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    content: {
        type: String,
        required: true,
        minlength: 10,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    categories: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
