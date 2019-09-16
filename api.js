const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();

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
  },
  {
    _id: 122,
    message: "I love pepperoni pizza!",
    author: "unknown"
  },
  {
    _id: 451,
    message: "I'm watching Netflix.",
    author: "unknown"
  },
  {
    _id: 129,
    message: "I love pepperoni pizza!",
    author: "unknown"
  },
  {
    _id: 452,
    message: "I'm watching Netflix.",
    author: "unknown"
  },
  {
    _id: 153,
    message: "I love pepperoni pizza!",
    author: "unknown"
  },
  {
    _id: 556,
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
  },
  {
    "_id": 1568434862658,
    "id": "CR",
    "name": "Costa Rica",
    "visited": true,
    "wishlist": false,
    "comment": "adads",
    "date": "2019-09-14T04:20:03.401Z",
    "fill": "rgb(240,92,92)",
    "author": "yo"
  }
]

router.get("/api/visited", (req, res) => {
  const orderedCountries = visitedCountry.sort((t1, t2) => t2._id - t1._id);
  res.send(orderedCountries);
});

router.post("/api/visited", (req, res) => {
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
    _id: new Date().getTime(),
    id,
    name,
    visited,
    wishlist,
    comment,
    date,
    fill,
    author: 'yo' //req.user.displayName
  };
  visitedCountry.push(newCountry);
  res.send({
    message: "Thanks!"
  });
});

//coutnry info
router.get("/api/country/:id", (req, res) => {
  console.log('asd')
  console.log(req.params.id)
  fetch(`https://restcountries.eu/rest/v1/name/${req.params.id}`, (req,res) => {
                res.send(res)
            }
        );
});

module.exports = router;