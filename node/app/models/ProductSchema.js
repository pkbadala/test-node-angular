var mongoose = require('mongoose');
var schema = mongoose.Schema;


var product = new schema({
    name : { type:String },
    description : { type:String },
    category : { type:String },
    status : { type: String }
},{
    timestamps:true
});

var Product = mongoose.model('product', product);

module.exports = {
    Product
}