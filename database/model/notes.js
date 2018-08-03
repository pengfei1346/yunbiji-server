var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notes = new mongoose.Schema({
    pic:String,
    noteId:String,
    id:String,
    note:String,
    noteText:String,
    username: String,
    title: String,
    browse:Number,
    reply:Number,
    upTime:Date,
    classify:String
}, {versionKey: false});

module.exports = mongoose.model('notes', notes,"notes");

