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

router.get("/search", (req, res, next) => {
  let cityArtist = req.query.city;
  Artist.find({ city: cityArtist })
    .populate("profile")
    .populate("services")
    .populate("comments")
    .then(allArtistByCity => res.json(allArtistByCity))
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
