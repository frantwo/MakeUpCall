const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ObjectID = require("mongodb").ObjectID;
// const mongo = require('mongodb'),
// var ObjectID = mongo.ObjectID;

router.get("/list", (req, res, next) => {
  User.find({})
    .populate("services")
    .then(artist => {
      res.json(artist);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/search", (req, res, next) => {
  let searchString = {};

  if (req.query.city) {
    searchString.city = req.query.city;
  }

  if (req.query.ranking) {
    if (req.query.ranking !== "0")
      searchString.ranking = Number(req.query.ranking);
  }

  if (req.query.services) {
    let arrayservices = req.query.services.split(",");
    console.log("arrayservices ANTES DE LA TRANSFORMACIÓN");
    console.log(arrayservices);

    let elementMatch = {
      $and: [
        {
          "services._id": {
            $in: []
          }
        },
        {
          "services.price": { $gt: 10 }
          // "services.price": {
          //   $gt: 50
          // }
        }
      ]
    };
    arrayservices.forEach(element => {
      return elementMatch["$and"][0]["services._id"]["$in"].push(element);
    });

    console.log("elementMatch");
    console.log(JSON.stringify(elementMatch));
    searchString = elementMatch;
  }

  // searchString.services = arrayservices;

  //{$and: [{"services._id": {$in: [ObjectId('5d3b120941794e2f5a3e503a')]}},{"services.price":{$gt:50}} ]}

  console.log("SE VA A BUSCAR:");
  console.log(searchString);

  User.find(searchString)
    .populate("services")
    // .populate("comments")
    .then(allArtistsFiltered => res.json(allArtistsFiltered))
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
