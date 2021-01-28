const router = require("express").Router();
const Message = require("../models/message.model");
const auth = require("../middleware/auth");

// @route   /api/messages/new
// @desc    Create a new message
// @access  Private
router.post("/new", auth, (req, res) => {
  console.log(req.user);
  const newMessage = new Message({
    content: req.body.content,
    user: req.user.id,
    group: req.body.group,
  });
  newMessage
    .save()
    .then(() => res.send("Message created succesfully."))
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

module.exports = router;
