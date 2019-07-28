const express = require("express");
const router = express.Router();
const Users = require("../models/User");

router.get("/list", (req, res, next) => {
  Users.find({ role: "Artist" })
    .populate("services")
    .then(artist => {
      res.json(artist);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
