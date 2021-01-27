const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9\-\_]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password pre-save

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// check if email and username are unique
UserSchema.plugin(uniqueValidator, { message: "is already taken." });

// methods

//Export the model
const User = mongoose.model("User", UserSchema);
module.exports = User;
