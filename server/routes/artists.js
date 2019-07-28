const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const ObjectID = require("mongodb").ObjectID;
// const mongo = require('mongodb'),
// var ObjectID = mongo.ObjectID;

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

router.get("/search", (req, res, next) => {
  let cityArtist = req.query.city;
  let rankingArtist = req.query.ranking;
  let servicesArtist = req.query.services;

  let searchString = {};

  if (cityArtist !== "undefined" && cityArtist) {
    searchString.city = cityArtist;
  }

  if (rankingArtist != "undefined" && rankingArtist) {
    if (rankingArtist !== "0") searchString.ranking = Number(rankingArtist);
  }

  if (servicesArtist != "undefined" && servicesArtist) {
    let arrayservices = servicesArtist.split(",");
    console.log("arrayservices ANTES DE LA TRANSFORMACIÓN");
    console.log(arrayservices);

    // let elementMatch = {
    //   $and: [
    //     {
    //       "services._id": {
    //         $in: []
    //       }
    //     },
    //     {
    //       "services.price": 10
    //       // "services.price": {
    //       //   $gt: 50
    //       // }
    //     }
    //   ]
    // };

    let elementMatch = {
      $and: [
        { "services._id": { $in: [new ObjectId("5d3d55d617728a1e95b9cbf3")] } },
        { "services.price": 15 }
      ]
    };

    // let tmpservices = arrayservices.map(element => new ObjectID(element));
    // console.log("ESTE ES EL ARRAY DE SERVICES PARA LA CONSULTA SQL");
    // console.log(tmpservices);
    // elementMatch["$and"][0]["services._id"]["$in"] = [...tmpservices];

    console.log("elementMatch");
    console.log(elementMatch);
    searchString = elementMatch;
  }

  // searchString.services = arrayservices;

  //{$and: [{"services._id": {$in: [ObjectId('5d3b120941794e2f5a3e503a')]}},{"services.price":{$gt:50}} ]}

  console.log("SE VA A BUSCAR:");
  console.log(searchString);

  Users.find(searchString)
    .populate("services")
    // .populate("comments")
    .then(allArtistFounded => res.json(allArtistFounded))
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
