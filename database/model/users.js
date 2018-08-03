var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new mongoose.Schema({
    username: String,
    password: String,
    HeaderImg:{
        type:String,
        default: '/images/timg.jpg'
    },
    email: {
        type:String,
        unique:true
    },
}, {versionKey: false});

module.exports = mongoose.model('users', users,"users");

