var express = require('express');
var router = express.Router();
var users = require("../database/model/users")

router.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    // console.log(email);
    // if(!req.session.users){
    users.findOne({email}).then(result => {
        // console.log(result);
        if (!result) {
            res.json({
                code: 404,
                msg: "该用户不存在"
            })
        } else if (result.password != password) {
            res.json({
                code: 403,
                msg: "密码错误"
            })
        } else if (result.password == password) {
            // console.log(result);
            req.session.users = result;
            let usermsg ={};
            usermsg.userHeader = `localhost:3000${result.HeaderImg}`;
            usermsg.username = result.username;
            usermsg.email = result.email;
            res.json({
                code: 200,
                data:usermsg,
                msg: "登录成功"
            })
        }
    })
    // } else if(req.session.users){
    //     res.json({
    //         code:400,
    //         msg: "用户已登录"
    //     })
    // }
});

router.get('/getMsg', function (req, res) {
    // console.log(req.session.users);
    if(req.session.users) {
        let usermsg ={};
        usermsg.username = req.session.users.username;
        usermsg.email = req.session.users.email;
        usermsg.userId = req.session.users._id;
        res.json({
            code:200,
            data:usermsg,
            msg: "该用户已登录"
        })
    }else{
        res.json({
            code:400,
            msg: "该用户没有登录"
        })
    }
});

router.get('/exit', function (req, res) {
    // console.log(req.session.users);
    if(req.session.users) {
        req.session.users=null;
        // console.log(req.session.users);
        res.json({
            code:200,
            msg: "退出登录成功"
        })
    }else{
        res.json({
            code:400,
            msg: "退出登录失败"
        })
    }
});

module.exports = router;