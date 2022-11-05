const mongoose = require("mongoose");

const NotifySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    count: { type: Number },
    notifications: {
      type: [
        {
          senderId: { type: String },
          receiverId: { type: String },
          senderName: { type: String },
          postId: { type: String },
          type: { type: Number },
        },
      ],
    },
  },
  // senderId: currentUser._id,
  // receiverId: post.userId,
  // senderName: currentUser.username,
  // postId: post._id,
  // type,
  { timestamps: true }
);

module.exports = mongoose.model("Notify", NotifySchema);
