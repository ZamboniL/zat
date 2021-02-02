const express = require("express");
const router = express.Router();
const async = require("async");
const ObjectId = require("mongoose").Types.ObjectId;
const auth = require("../middleware/auth");

// Require Models
const Group = require("../models/group.model");
const Messages = require("../models/message.model");
const User = require("../models/user.model");

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
  Group.find({ users: req.params.user_id }).exec((group) => {
    console.log(group);
    res.send(group);
  });
});

module.exports = router;
