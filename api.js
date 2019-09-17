const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();
const mongoose = require('mongoose');
const dbserver = require('./dbserver')
const Country = require("./models/ctry_visited")

router.use(bodyParser.json());

const thoughts = [{
    _id: 123,
    message: "I love pepperoni pizza!",
    author: "unknown"
  },
  {
    _id: 456,
    message: "I'm watching Netflix.",
    author: "unknown"
  }
];

router.get("/api/thoughts", (req, res) => {
  const orderedThoughts = thoughts.sort((t1, t2) => t2._id - t1._id);
  res.send(orderedThoughts);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send(401);
}

router.post("/api/thoughts", ensureAuthenticated, (req, res) => {
  const {
    message
  } = req.body;
  const newThought = {
    _id: new Date().getTime(),
    message,
    author: req.user.displayName
  };
  thoughts.push(newThought);
  res.send({
    message: "Thanks!"
  });
});

//Visited Countries
const visitedCountry = [{
    "_id": 1568434865523,
    "id": "PA",
    "name": "Panama",
    "visited": true,
    "wishlist": false,
    "comment": "adads",
    "date": "2019-09-14T04:20:03.401Z",
    "fill": "rgb(240,92,92)",
    "author": "yo"
  }
]

router.get("/api/visited", (req, res) => {
  //const orderedCountries = visitedCountry.sort((t1, t2) => t2._id - t1._id);
  //res.send(orderedCountries);
  dbserver();
  Country.find({}, function(err, ctry_visited){
    res.send(ctry_visited)
  })
});

router.post("/api/visited", (req, res) => {
  dbserver()
  const {
    id,
    name,
    visited,
    wishlist,
    comment,
    date,
    fill
  } = req.body.data;
  const newCountry = {
    _id: mongoose.Types.ObjectId(),//new Date().getTime(),
    id,
    name,
    visited,
    wishlist,
    comment,
    date,
    fill,
    user: 'yo' //req.user.displayName
  };
  //visitedCountry.push(newCountry);
  Country.create(newCountry)
  res.send({
    message: "Thanks!"
  });
});

// router.get("/api/db/all/", (req, res) => {
//   dbserver()
//   console.log("/api/db/all")

//    Country.find({}, function(err, ctry_visited){
//      res.send(ctry_visited)
//    })
// });

// router.post("/api/db/addCountry", (req, res) => {
//   dbserver()
//   console.log("/api/db/addCountry")
//   const {
//     id,
//     name,
//     visited,
//     wishlist,
//     comment,
//     date,
//     fill
//   } = req.body.data;
//   const newCountry = {
//     _id: mongoose.Types.ObjectId(),
//     id,
//     name,
//     visited,
//     wishlist,
//     comment,
//     date,
//     fill,
//     user: "y" //req.user.displayName
//   };
//    Country.create(newCountry)
// });

module.exports = router;