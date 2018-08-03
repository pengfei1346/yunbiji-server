var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var swipes = new mongoose.Schema({
    pic:String,
}, {versionKey: false});

module.exports = mongoose.model('swipes', swipes,"swipes");
