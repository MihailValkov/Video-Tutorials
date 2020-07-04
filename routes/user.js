const router = require('express').Router();
const controller = require('../controllers/user');
const auth= require('../utils/auth')

router.get('/register',controller.get.register);
router.get('/login',controller.get.login);
router.get('/logout',auth(true),controller.get.logout);
router.get('/profile',auth(true),controller.get.profile);


router.post('/register',controller.post.register);
router.post('/login',controller.post.login);

module.exports=router;