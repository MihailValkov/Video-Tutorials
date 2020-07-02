const router = require('express').Router();
const controller = require('../controllers/course');
const auth = require('../utils/auth');

router.get('/create', auth(true), controller.get.create);


router.post('/create', auth(true), controller.post.create);

module.exports= router;