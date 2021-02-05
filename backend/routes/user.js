const auth = require("../middleware/auth");
const Group = require("../models/group.model");
const User = require("../models/user.model");
const router = require("express").Router();

// @route   /api/user/new_friend
// @desc    Add a new friend
// @access  Private
router.post("/new_friend", auth, (req, res) => {
  const tag = req.body.tag;
  if (req.body.user.tag === req.body.tag)
    return res.status(400).send("Você não pode se adicionar");
  User.findOne({ tag }, async function (err, target) {
    if (err) throw err;
    if (!target) res.status(400).send("Usuário não encontrado");
    if (target) {
      const update = { $addToSet: { friends: target._id } };
      const filter = req.body.user._id;
      User.updateOne(
        { _id: filter },
        update,
        {
          new: true,
        },
        (err, result) => {
          if (err) throw err;
          return res.json(target);
        }
      );
    }
  });
});

// @route   /api/user/info/:id
// @desc    Get user general information
// @access  Private
router.get("/info/:id", auth, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("friends", "-password");
  const groups = await Group.find({ users: id });
  res.json({ user, groups });
});

// @route   /api/user/friends
// @desc    Get user friends
// @access  Private
router.get("/friends", auth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id)
    .select("friends")
    .populate("friends", "-password");
  res.json(user.friends);
});

// @route   /api/user/picture
// @desc    Change picture
// @access  Private
router.post("/picture", auth, (req, res) => {
  const { picture_filename } = req.body;

  const filter = req.user.id;
  const update = { picture_filename };
  User.findOneAndUpdate(
    { _id: filter },
    update,
    {
      new: true,
    },
    (err, user) => {
      if (err) throw err;
      return res.json(user);
    }
  );
});

module.exports = router;
