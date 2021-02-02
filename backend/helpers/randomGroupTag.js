const Group = require("../models/group.model");

module.exports = async function () {
  var user = true;
  var tag;
  while (user) {
    tag = Math.floor(Math.random() * (900000 - 1)) + 1;
    user = await Group.findOne({ tag });
  }
  const finalTag = tag.toString().padStart(6, "0").padStart(7, "#");
  return finalTag;
};
