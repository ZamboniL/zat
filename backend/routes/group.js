const express = require("express");
const router = express.Router();
const async = require("async");
const ObjectId = require("mongoose").Types.ObjectId;

// Require Models
const Group = require("../models/group.model");
const Messages = require("../models/message.model");

router.get("/:id", function (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) return Error({ status: 422 });
  async.parallel(
    {
      group: (callback) => {
        Group.findById(req.params.id)
          .populate("users", "-senha")
          .exec(callback);
      },
      group_messages: (callback) => {
        Messages.find({ group: req.params.id })
          .populate("user", "-senha")
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.group == null) {
        var err = new Error("Grupo não encontrado");
        err.status = 404;
        return next(err);
      }
      res.json(results);
    }
  );
});

module.exports = router;
