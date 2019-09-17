const mongoose = require('mongoose');

var dbserver = function() {
  //mongo
 const dbUrl = process.env.MONGO_DB,
      dbOptions = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
// Set DB from mongoose connection
    mongoose.connect(dbUrl, dbOptions)
    const dbserver = mongoose.connection
    dbserver.on('error', console.error.bind(console, 'MongoDB connection error:'))
    
    return dbserver;
}   

  module.exports = dbserver;