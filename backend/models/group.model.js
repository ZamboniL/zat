const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var GroupSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    index: true,
  },
  canais: {
    type: [String],
    default: ["new-group"],
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
