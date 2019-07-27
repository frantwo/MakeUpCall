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
  let rankingArtist = req.query.ranking;

  let searchString = {};

  if (cityArtist !== "undefined" && cityArtist) {
    searchString.city = cityArtist;
  }

  if (rankingArtist != "undefined" && rankingArtist) {
    if (rankingArtist !== "0") searchString.ranking = Number(rankingArtist);
  }

  console.log("SE VA A BUSCAR:");
  console.log(searchString);

  Artist.find(searchString)
    .populate("profile")
    .populate("services")
    .populate("comments")
    .then(allArtistByCity => res.json(allArtistByCity))
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
