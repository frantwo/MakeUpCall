const express = require("express");
const router = express.Router();
const Service = require("../models/Services");

router.get("/list", (req, res, next) => {
  Service.find({})
    .then(service => {
      console.log("SERVICIOS ENCONTRADOS!!!");
      console.log(service);
      res.json(service);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
