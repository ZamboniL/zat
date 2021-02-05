const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const auth = require("../middleware/auth");

// Require Models
const Group = require("../models/group.model");
const Messages = require("../models/message.model");
const randomGroupTag = require("../helpers/randomGroupTag");
const User = require("../models/user.model");

// @route   /api/group/new
// @desc    Create new group
// @access  Private
router.post("/new", auth, async function (req, res, next) {
  const { title, desc, picture_filename, user } = req.body;
  // Validation
  if (!title || !desc || !picture_filename || !user) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const tag = await randomGroupTag();

  const newGroup = new Group({
    title,
    desc,
    tag,
    users: [user._id],
    picture_filename,
  });

  newGroup.save().then((group) => {
    res.json(group);
  });
});

// @route   /api/group/:id
// @desc    Get group info
// @access  Private
router.get("/:id", auth, async function (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) return Error({ status: 422 });
  const group = await Group.findById(req.params.id).populate({
    path: "users",
    model: "User",
  });
  const group_messages = await Messages.find({ group: req.params.id }).populate(
    "user"
  );
  if (group == null) {
    var err = new Error("Grupo não encontrado");
    err.status = 404;
    return next(err);
  }
  res.json({ group, group_messages });
});

// @route   /api/group/user/:user_id
// @desc    Get user groups info
// @access  Private
router.get("/user/:user_id", auth, (req, res) => {
  if (!ObjectId.isValid(req.params.user_id)) return Error({ status: 422 });
  console.log(req.params.user_id);
  // User.findById(req.params.user_id).then((user) => res.json(user));
  Group.find({ users: req.params.user_id }).exec((err, group) => {
    if (err) throw err;
    res.json(group);
  });
});

// @route   /api/group/new_user
// @desc    Add a new user to the group
// @access  Private
router.post("/new_user", auth, (req, res) => {
  const tag = req.body.tag;
  const groupId = req.body.groupId;
  User.findOne({ tag }, async function (err, target) {
    if (err) throw err;
    if (!target) res.status(400).send("Usuário não encontrado");
    if (target) {
      const update = { $addToSet: { users: target._id } };
      Group.findOneAndUpdate(
        { _id: groupId },
        update,
        {
          new: true,
        },
        (err, group) => {
          if (err) throw err;
          return res.json(target);
        }
      );
    }
  });
});

module.exports = router;
