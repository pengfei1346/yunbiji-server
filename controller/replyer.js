var express = require('express');
var router = express.Router();
var reply = require("../database/model/reply");
var notes = require("../database/model/notes");

router.post('/note/reply', (req, res) => {
    // console.log(req.session.users);
    let username = req.session.users.username;
    let {noteId, userId, replyContent} = req.body;
    // console.log(username);
    // console.log(userId);
    reply.create({noteId, username, userId, replyContent}).then(cal => {
        let _id=noteId;
        notes.findOne({_id}).then(data => {
            let reply=data.reply + 1;
            console.log(reply);
            notes.update({noteId}, {$set: {reply}}).then(data => {
                res.json({
                    code: 200,
                    mgs: "回复成功"
                })
            })
        })
    }).catch(err => {
        res.json({
            code: 400,
            mgs: "回复失败"
        })
    })

});

module.exports = router;