const auth = require("../middleware/auth");
const Group = require("../models/group.model");
const User = require("../models/user.model");
const router = require("express").Router();

// @route   /api/user/new_friend
// @desc    Add a new friend
// @access  Private
router.post("/new_friend", auth, (req, res) => {
  const tag = req.body.tag;
  User.findOne({ tag }, async function (err, target) {
    if (err) throw err;
    if (!target) res.status(400).send("Usuário não encontrado");
    if (target) {
      const update = { $addToSet: { friends: target._id } };
      const filter = req.body.user._id;
      User.findOneAndUpdate(
        { _id: filter },
        update,
        {
          new: true,
        },
        (err, user) => {
          if (err) throw err;
          return res.json(target);
        }
      );
    }
  });
});

router.get("/info/:id", auth, async (req, res) => {
  const { id } = req.params;
  console.log;
  const user = await User.findById(id).populate("friends", "-password");
  const groups = await Group.find({ users: id });
  res.json({ user, groups });
});

module.exports = router;
