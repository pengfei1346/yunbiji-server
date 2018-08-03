var express = require('express');
var router = express.Router();
var users = require("../database/model/users")
var isEmail = require('validator/lib/isEmail')

router.post('/register', function (req, res) {
    let {username, password, email} = req.body;
    // console.log(username,email, password)
    users.findOne({email}).then(data => {
        if (data) {
            res.json({
                code: 401,
                msg: "邮箱已存在",
            })
        } else {
            if (!isEmail(email)) {
                res.json({
                    code: 402,
                    msg: "请输入正确的邮箱",
                })
            }
            else {
                users.create({username, password, email}).then((data) => {
                    res.json({
                        code: 200,
                        msg: "注册成功"
                    })
                }).catch(err => {
                    res.json({
                        code: 401,
                        msg: "注册失败"
                    })
                })
            }
        }
    })
});

// router.post('/putImg', function (req, res) {
//
// });
module.exports = router;