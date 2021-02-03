const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var GroupSchema = new Schema({
  title: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
  },
  desc: {
    type: String,
  },
  canais: {
    type: [String],
    default: ["new-group"],
  },
  picture_filename: { type: String, required: true },
  tag: { type: String, required: true, unique: true },
  users: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
