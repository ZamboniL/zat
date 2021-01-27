const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    content: { type: String, required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    target: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
