const router = require("express").Router();
const Message = require("../models/message.model");
const auth = require("../middleware/auth");
const ObjectId = require("mongoose").Types.ObjectId;

// @route   /api/message/new
// @desc    Create a new message
// @access  Private
router.post("/new", auth, (req, res) => {
  const message = {
    content: req.body.content,
    user: req.body.user,
    group: req.body.group,
  };
  const newMessage = new Message(message);
  newMessage
    .save()
    .then(() => {
      Message.findById(newMessage._id)
        .populate("user", "-password")
        .then((message) => {
          res.json(message);
        });
    })
    .catch((err) => {
      if (err) {
        res
          .status(400)
          .send(
            err.message
              .toString()
              .replace("Message validation failed:", "")
              .split(",")
          );
      }
    });
});

// @route   /api/message/group/:group_id
// @desc    Get group messages
// @access  Private
router.get("/group/:group_id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.group_id)) return Error({ status: 422 });
  Message.find({ group: req.params.group_id })
    .populate("user", "-password")
    .exec((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;
