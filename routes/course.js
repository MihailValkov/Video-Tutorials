const router = require('express').Router();
const controller = require('../controllers/course');
const auth = require('../utils/auth');

router.get('/create', auth(true), controller.get.create);
router.get('/details/:courseId', auth(true), controller.get.details);
router.get('/delete/:courseId', auth(true), controller.get.delete);
router.get('/edit/:courseId', auth(true), controller.get.edit);
router.get('/join/:courseId', auth(true), controller.get.join);
router.get('/search', auth(true), controller.get.search);


router.post('/create', auth(true), controller.post.create);
router.post('/edit/:courseId', auth(true), controller.post.edit);


module.exports= router;