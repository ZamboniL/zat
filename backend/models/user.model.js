const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
      match: [/\S+@\S+\.\S+/, "não valido"],
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "precisa ser de no minimo 6 caracteres."],
    },
    picture_filename: { type: String, required: true },
    tag: { type: String, required: true, unique: true },
    friends: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  },
  { timestamps: true }
);
// check if email and username are unique
UserSchema.plugin(uniqueValidator, { message: "já foi utilizado." });

//Export the model
const User = mongoose.model("User", UserSchema);
module.exports = User;
