var express = require('express');
var router = express.Router();
var notes = require("../database/model/notes");
var reply = require("../database/model/reply");

router.get('/note/list', function (req, res) {
    notes.find({}).limit(10).then(data => {
        res.json({
            code: 200,
            data,
            msg: "获取成功"
        })
    })
});

router.post('/note/seek', (req, res) => {
    let title = req.body.title;
    // console.log(req.body);
    let reg = new RegExp(`${title}`)
    notes.find({title: reg}).then(data => {
        res.json({
            code: 200,
            msg: "获取成功",
            data
        })
    })
})

router.post('/note/detail', function (req, res) {
    let _id = req.body._id;
    // console.log(_id);
    notes.findOne({_id}).then(data => {
        let allData = {};
        allData.data = data;
        let browse = data.browse += 1;
        notes.update({_id}, {$set: {browse}}).then(data => {
        });
        reply.find({noteId: _id}).then(rda => {
            // console.log(rda);

            res.json({
                code: 200,
                rda,
                data
            })
        })
    })
});

router.post('/note/addNote', function (req, res) {
    let username = req.session.users.username;
    let {title, note, noteText, classify} = req.body;

    console.log(classify);
    const upTime = new Date().toUTCString();
    let browse = 0;
    let reply = 0;
    notes.create(
        {username, title, note, noteText, classify, upTime, browse, reply}
    ).then(data => {
        if (data) {
            res.json({
                code: 200,
                data,
                msg: "添加成功"
            })
        } else {
            res.json({
                code: 400,
                data,
                msg: "添加失败"
            })
        }
    })
});

module.exports = router;