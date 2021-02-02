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
      const io = req.app.locals.io;
      Message.findById(newMessage._id)
        .populate("user", "-password")
        .then((message) => {
          io.sockets.emit("new message", message);
          res.send("Message created succesfully.");
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

// @route   /api/message/group/group_id
// @desc    Get group messages
// @access  Private
router.get("/group/:group_id", auth, (req, res) => {
  if (!ObjectId.isValid(req.params.group_id)) return Error({ status: 422 });
  Message.find({ group: req.params.group_id })
    .populate("user", "-password")
    .exec((messages) => res.json(messages));
});

module.exports = router;
