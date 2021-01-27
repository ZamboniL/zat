const router = require("express").Router();
const User = require("../models/user.model");
const passport = require("passport");
require("../config/passportConfig")(passport);

router.route("/register").post((req, res) => {
  User.findOne({ email: req.body.email }, (err, doc) => {
    if (err) throw err;
    if (doc) {
      res.status(400).send("Uma conta com esse email já existe");
    }
    if (!doc) {
      User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
          res.status(400).send("Este username já existe");
        }
        if (!doc) {
          const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
          });
          await newUser.save((err) => {
            if (err) throw err;
          });
          res.send("User Created");
        }
      });
    }
  });
});

router.route("/login").post((req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(404).send("Usuário não encontrado");
    else {
      console.log("hiiii");
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    }
  })(req, res, next);
});

module.exports = router;
