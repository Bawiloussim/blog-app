const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    description: {
        type: String,
        default: "",
    },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
