const mongoose = require("mongoose");

const ConFirmSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
    },
    senderId: {
      type: String,
    },
    receiverId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConFirm", ConFirmSchema);
