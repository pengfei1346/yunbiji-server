var express = require('express');
var router = express.Router();
var swipes = require("../database/model/swipes")

router.get('/getSwipe', function (req, res) {
    swipes.find({}).then(result => {
        console.log(result);
        if (result) {
            res.json({
                code: 200,
                msg: "获取成功"
            })
        } else {
            res.json({
                code: 403,
                msg: "获取失败"
            })
        }
    })
});

router.post('/addSwipe', function (req, res) {
    let pic = req.body;
    console.log(pic);
    swipes.create({pic}).then(result => {
        res.json({
            code: 200,
            msg: "添加成功"
        })
    }).catch(err => {
        res.json({
            code: 401,
            msg: "添加失败"
        })
    })
});

// router.post('/putImg', function (req, res) {
//     console.log(req.body);
//     res.json({
//         data:req
//     })
// });
module.exports = router;