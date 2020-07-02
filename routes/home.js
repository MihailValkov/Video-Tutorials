const router = require('express').Router();
const controller = require('../controllers/home');
const auth = require('../utils/auth');

router.get('/home/', auth(false),controller.get.home);

module.exports= router;