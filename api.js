const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();
const mongoose = require('mongoose');
const dbserver = require('./dbserver')
const Country = require("./models/ctry_visited")
const MustDo = require("./models/mustdo")

router.use(bodyParser.json());

router.get("/api/thoughts", (req, res) => {
  dbserver();
  MustDo.find({}, function(err, mustdo){
    res.send(mustdo)
  }).sort({date_inserted:-1})
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send(401);
}

router.post("/api/thoughts", ensureAuthenticated, (req, res) => {
  dbserver()
  const {
    message, country, name, flag
  } = req.body;
  const newThought = {
    _id: mongoose.Types.ObjectId(),
    message,
    country,
    name,
    flag,
    user: req.user.displayName,
    userid: req.user.id
  };
  //thoughts.push(newThought);
  MustDo.create(newThought)
  res.send({
    message: "Thanks!"
  });
});

router.get("/api/visited", ensureAuthenticated,(req, res) => {
  //const orderedCountries = visitedCountry.sort((t1, t2) => t2._id - t1._id);
  //res.send(orderedCountries);
  dbserver();
  Country.find({}, function(err, ctry_visited){
    res.send(ctry_visited)
  })
});

router.post("/api/visited", ensureAuthenticated, (req, res) => {
  dbserver()
  const {
    id,
    name,
    visited,
    wishlist,
    comment,
    date,
    fill,
    _id
  } = req.body.data;
  console.log(_id);
  const newCountry = {
    _id: mongoose.Types.ObjectId(),
    id,
    name,
    visited,
    wishlist,
    comment,
    date,
    fill,
    user: req.user.displayName,
    userid: req.user.id
  };
  //visitedCountry.push(newCountry);
  Country.create(newCountry ,function(err, newCountry) {
    res.send(
    {body: newCountry}
  );
  });
});

module.exports = router;