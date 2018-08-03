const {Router} = require("express");
const router = Router();

const register = require('./register');
const login = require('./login');
const notelist = require('./notelist');
const swipe = require('./swipe');
const replyer = require('./replyer');
const upload = require('./upload');
const path =require('path')

router.use(login)
router.use(register);
router.use(notelist);
router.use(swipe);
router.use(replyer);

router.use(upload);

router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname,'../pages/index.html'));
});

module.exports = router;