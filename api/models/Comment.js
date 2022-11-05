const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    from: {
      type: String,
    },
    message: {
      type: String,
    },
    postId: {
      type: String,
    },
    feedback: {
      type: [
        {
          userId: { type: String },
          content: { type: String },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
