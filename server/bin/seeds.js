require("dotenv").config();
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
  .connect(process.env.ATLAS_CONNECTION, { useNewUrlParser: true })
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
    role: "Artist",
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
      }
    ],
    ranking: 5,
    city: "Madrid"
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    email: "bob@gmail.com",
    role: "User",
    experience: "",
    services: [],
    areas: [],
    pictures: [],
    ranking: undefined,
    city: ""
  }
];

let userstmp = Array(8).fill(users[0]);
users = [...users, ...userstmp];
userstmp = [];

let servicelist = [
  { name: "Maquillaje de boda" },
  { name: "Maquillaje de fantasía" },
  { name: "Sesión de maquillaje" }
];

let commentslist = [
  {
    valoration: 5,
    title: "una persona muy profesional",
    comment: "Volveré con ella si vuelvo a tener una boda",
    user: undefined,
    artist: undefined
  }
];

Services.deleteMany()
  .then(() => {
    console.log("Starting the creation of services...");
    Services.create(servicelist)
      .then(servicescreated => {
        console.log("Services created sucesfully");
        console.log(servicescreated);
        servicestmp = servicescreated;
        users = users.map(oneuser => {
          oneuser.services = servicescreated.map((oneservice, index) => {
            return { serviceId: oneservice._id, price: index * 10 };
          });
          return oneuser;
        });
      })
      .then(() => {
        console.log("Starting the creation of users...");
        User.deleteMany().then(() => {
          User.create(users)
            .then(usersCreated => {
              console.log("Users created sucesfully");
              console.log(usersCreated);

              userstmp = usersCreated.filter(
                oneuser => oneuser.role === "User"
              );
              commentslist[0].user = userstmp[0]._id;

              userstmp = usersCreated.filter(
                oneuser => oneuser.role === "Artist"
              );
              commentslist[0].artist = userstmp[0]._id;
            })
            .then(() => {
              console.log("Starting the creation of comments");
              Comments.deleteMany().then(() => {
                Comments.create(commentslist).then(commentcreated => {
                  console.log("Comments created sucesfully");
                  console.log(commentcreated);

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
