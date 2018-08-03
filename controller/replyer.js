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
        let _id = noteId;

        notes.findOneAndUpdate(
            {_id},
            {$inc: {reply: 1}}).then(data => {
            res.json({
                code: 200,
                mgs: "回复成功",
                data
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