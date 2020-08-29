/****************************
 MONGOOSE SCHEMAS
 ****************************/
let config = require('./configs');
let mongoose = require('mongoose');
mongoose.Promise  =  global.Promise;

module.exports = function() {
    var db = mongoose.connect(config.db, config.mongoDBOptions).then(
        () => { console.log('MongoDB connected') },
        (err) => { console.log('MongoDB connection error',err) }
    );

    //Load all Schemas
    require('../app/models/ProductSchema');

    return db;
};
