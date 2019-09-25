const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  var mustdo = new Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    country: String,
    message: String,
    name: String,
    flag: String,
    user: String,
    userid: String,
    date_inserted: { type: Date, default: Date.now }
  });
  
  var MustDo = mongoose.model('mustdo', mustdo);


  //console.log(Country.create({_id:mongoose.Types.ObjectId(),id:"USA"}));

  module.exports = MustDo;