// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Artist = require("../models/Artist");
const Services = require("../models/Services");
const Comments = require("../models/Comments");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/server", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email: "alice@gmail.com",
    role: "Artist"
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    email: "bob@gmail.com",
    role: "User"
  }
];

let artistslist = [
  {
    profile: "",
    experience: "Años cortando el pelo",
    services: [],
    areas: [],
    pictures: [
      {
        photo_name: "first picture",
        photo_url:
          "https://modaellas.com/wp-content/uploads/2015/09/maquillaje-de-fantasia-para-carnaval-2016-ideas-maquillaje-de-corona-de-princesa.jpg"
      },
      {
        photo_name: "second picture",
        photo_url:
          "http://www.maquillajescorporalesbeatriz.com/wp/wp-content/uploads/2016/10/Maquillaje-comparsa-Kimera-2.jpg"
      },
      {
        photo_name: "third picture",
        photo_url:
          "http://mm.disfracesycarnaval.es/uploads/maquillaje-disfraces/maquillaje-fantasia-carnaval-blanco.jpg"
      },
      {
        photo_name: "fourth picture",
        photo_url:
          "https://tendenzias.com/wp-content/uploads/2012/05/maquillaje-de-boda-de-noche-para-novias-clasico-istock.jpg"
      },
      {
        photo_name: "fifth picture",
        photo_url:
          "https://marcasdemaquillaje.com/wp-content/uploads/2018/10/maquillaje-para-novia-perfecto.jpg"
      },

      ,
      ,
    ]
  }
];

artistslist = Array(8).fill(artistslist[0]);

let servicelist = [
  { name: "Maquillaje de boda" },
  { name: "Maquillaje de fantasía" },
  { name: "Sesión de maquillaje" }
];
let servicestmp = [];

Services.deleteMany()
  .then(() => {
    console.log("Starting the creation of services...");
    Services.create(servicelist)
      .then(servicescreated => {
        console.log("Services created sucesfully");
        console.log(servicescreated);
        servicestmp = servicescreated;
      })
      .then(() => {
        console.log("Starting the creation of users...");
        User.deleteMany().then(() => {
          User.create(users)
            .then(usersCreated => {
              console.log("Users created sucesfully");
              console.log(usersCreated);
              //update the reference of the user into the artist model (for the population)
              usersCreated.forEach(u => {
                if (u.role == "Artist") {
                  artistslist[0].profile = u._id;
                  artistslist[0].services = servicestmp.map(oneservice => {
                    return { _id: oneservice._id, price: 100 };
                  });

                  // delete artistslist[0].services.name;
                }
              });
              console.log("=============");
              console.log(artistslist);
            })
            .then(() => {
              console.log("Starting the creation of artists");
              Artist.deleteMany().then(() => {
                Artist.create(artistslist).then(artistscreated => {
                  console.log("Artists created sucesfully");
                  console.log(artistscreated);

                  // Close properly the connection to Mongoose
                  mongoose.disconnect();

                  console.log("SEEDS PROCESS HAS FINISHED SUCCESFULLY!!!!");
                });
              });
            });
        });
      });
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
