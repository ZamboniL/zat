const express = require("express");
const router = express.Router();
const async = require("async");
const ObjectId = require("mongoose").Types.ObjectId;
const auth = require("../middleware/auth");

// Require Models
const Group = require("../models/group.model");
const Messages = require("../models/message.model");
const randomGroupTag = require("../helpers/randomGroupTag");

// @route   /api/group/new
// @desc    Create new group
// @access  Private
router.post("/new", auth, async function (req, res, next) {
  const { title, desc, user } = req.body;

  // Validation
  if (!title || !desc || !user) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const tag = await randomGroupTag();

  const newGroup = new Group({
    title,
    desc,
    tag,
    users: [user._id],
    picture_filename: "/images/groupProfile/default.jpg",
  });

  newGroup.save().then((group) => {
    res.json(group);
  });
});

// @route   /api/group/:id
// @desc    Get group info
// @access  Private
router.get("/:id", auth, function (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) return Error({ status: 422 });
  async.parallel(
    {
      group: (callback) => {
        Group.findById(req.params.id)
          .populate("users", "-senha")
          .exec(callback);
      },
      group_messages: (callback) => {
        Messages.find({ group: req.params.id })
          .populate("user", "-password")
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.group == null) {
        var err = new Error("Grupo não encontrado");
        err.status = 404;
        return next(err);
      }
      res.json(results);
    }
  );
});

// @route   /api/group/user/:user_id
// @desc    Get group info
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

module.exports = router;
