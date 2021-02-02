const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");
const randomTag = require("../helpers/randomUserTag");

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(async (user) => {
    if (user) return res.status(400).json({ msg: "Email já cadastrado" });
    const tag = await randomTag();
    const newUser = new User({
      username,
      email,
      password,
      picture_filename: "/images/userProfile/default.jpg",
      tag,
    });
    // Password hash generation
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            jwt.sign(
              { id: user.id },
              process.env.JWT_SECRET,
              {
                expiresIn: 3600 * 24,
              },
              (err, token) => {
                if (err) throw err;

                res.json({
                  token,
                  user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                  },
                });
              }
            );
          })
          .catch((err) => {
            return res.status(400).send(err.msg);
          });
      });
    });
  });
});

// @route   POST /api/auth/login
// @desc    Auth user
// @access  Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Preencha todos os campos" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "Email não cadastrado" });

    // Validate password sent with hash generated previously
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Senha incorreta" });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600 * 24,
        },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route   GET /api/auth/user
// @desc    get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
