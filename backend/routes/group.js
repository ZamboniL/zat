const express = require("express");
const router = express.Router();
const async = require("async");
const ObjectId = require("mongoose").Types.ObjectId;

// Require Models
const Group = require("../models/group.model");

router.get("/:id", function (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) return Error({ status: 422 });
  Group.findById(req.params.id)
    .populate("users")
    .exec(function (err, group) {
      if (err) {
        return next(err);
      }
      if (!group) { // No results.
        var err = new Error('Group not found');
        err.status = 404;
        return next(err);
    }
      // if (!group) {
      //   res.writeHead(404, ["Group not found"]).send();
      //   res.end("group not found")
      // }
      res.json({ group });
    });
});

module.exports = router;
