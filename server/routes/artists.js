const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const ObjectID = require("mongodb").ObjectID;
// const mongo = require('mongodb'),
// var ObjectID = mongo.ObjectID;
const uploader = require("../configs/cloudinary-setup");

const selectionObject = {
  _id: true,
  username: true,
  email: true,
  role: true,
  services: true,
  experience: true,
  pictures: true,
  ranking: true,
  city: true
};

router.get("/getDetails/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate({
      path: "services.serviceId",
      model: "Services"
    })
    .then(artist => {
      res.json(artist);
    })
    .catch(err => console.log(err));
});

router.post("/upload", uploader.single("photo_url"), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

router.post("/pictures/create", (req, res, next) => {
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method
  console.log("/pictures/create");
  console.log(req.body);
  User.findByIdAndUpdate(req.body.userID, {
    $push: {
      pictures: {
        photo_name: req.body.photo_name,
        photo_url: req.body.photo_url
      }
    }
  })
    .then(aNewThing => {
      // console.log('Created new thing: ', aNewThing);
      res.status(200).json(aNewThing);
    })
    .catch(err => next(err));
});

router.get("/list", (req, res, next) => {
  User.find({})
    .populate("Services")
    .then(artist => {
      res.json(artist);
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/delete/:artistID", (req, res) => {
  User.findByIdAndDelete(req.params.artistID)
    .then(() => {
      res.json({ deleted: true });
    })
    .catch(err => {
      console.log(err);
    });
});

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

router.put("/update", (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(req.body.password, salt);

  let tmpServices;
  if (req.body.services) {
    tmpServices = req.body.services.map(element => {
      return {
        _id: element.value,
        price: randomIntFromInterval(10, 100)
      };
    });
  }

  User.findByIdAndUpdate(req.body._id, {
    username: req.body.username,
    password: hashPass,
    email: req.body.email,
    city: req.body.city,
    services: tmpServices,
    experience: req.body.experience
  })
    .then(updatedUser => {
      console.log("RESPUESTA DE MOONGOSE:");
      console.log(updatedUser);
      // User.findById(updatedUser._id)
      //   .select(selectionObject)
      //   .then(theupdatedUser => res.json(theupdatedUser));
      res.json({ updated: true });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/search", (req, res, next) => {
  let searchString = {};
  if (req.query.city) {
    searchString = { city: req.query.city };
  }

  if (req.query.ranking) {
    if (req.query.ranking !== "0")
      searchString = { ...searchString, ranking: req.query.ranking };
  }

  if (req.query.services) {
    let arrayservices = req.query.services.split(",");

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
        {
          "services._id": {
            $in: []
          }
        },
        { ...searchString }
        // {
        //   "services.price": { $gt: 10 }
        //   // "services.price": {
        //   //   $gt: 50
        //   // }
        // }
      ]
    };
    arrayservices.forEach(element => {
      return elementMatch["$and"][0]["services._id"]["$in"].push(element);
    });

    console.log("elementMatch");
    console.log(JSON.stringify(elementMatch));

    searchString = { ...elementMatch };
  }

  // searchString.services = arrayservices;

  //{$and: [{"services._id": {$in: [ObjectId('5d3b120941794e2f5a3e503a')]}},{"services.price":{$gt:50}} ]}

  console.log("SE VA A BUSCAR:");
  console.log(searchString);

  User.find(searchString)
    .populate({
      path: "services.serviceId",
      model: "Services"
    })
    // .populate("comments")
    .then(allArtistsFiltered => {
      res.json(allArtistsFiltered);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
