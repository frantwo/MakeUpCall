const express = require("express");
const router = express.Router();
const Artist = require("../models/Artist");

router.get("/list", (req, res, next) => {
  Artist.find({})
    .populate("profile")
    .populate("services")
    .then(artist => {
      res.json(artist);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
