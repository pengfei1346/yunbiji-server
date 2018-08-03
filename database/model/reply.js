var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reply = new mongoose.Schema({
    noteId:String,
    username:String,
    userId:String,
    replyContent:String,
}, {versionKey: false});

module.exports = mongoose.model('reply', reply,"reply");

