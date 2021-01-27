const User = require("../models/user.model");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      function (email, password, done) {
        User.findOne({ email: email }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          user.comparePassword(password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    });
  });
};
