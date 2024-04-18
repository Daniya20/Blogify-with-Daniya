const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
}, { timestamps: true });

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment; // Export the Comment model directly without overwriting the export
