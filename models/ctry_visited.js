const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  var ctry_visited = new Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    id: String,
    name: String,
    visited: Boolean,
    wishlist: Boolean,
    comment: String,
    date: Date,
    fill: String,
    user: String,
    date_inserted: { type: Date, default: Date.now }
  });
  
  var Country = mongoose.model('visited', ctry_visited);


  //console.log(Country.create({_id:mongoose.Types.ObjectId(),id:"USA"}));

  module.exports = Country;