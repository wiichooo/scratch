const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  var user = new Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    id: String,
    name: String,
    visited: Boolean,
    date_inserted: { type: Date, default: Date.now }
  });
  
  var User = mongoose.model('user', user);

  module.exports = User;