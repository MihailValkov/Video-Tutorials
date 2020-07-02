const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/register',controller.get.register);



router.post('/register',controller.post.register);

module.exports=router;