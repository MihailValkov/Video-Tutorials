const Course = require('../models/courseModel');
module.exports = {
    get : {
        home(req,res,next){
            Course.find().lean().then(courses => {
                res.render('home/home.hbs',{title:"Home Page", ...req.locals , courses})
            })
        }
    },
    post : {}
}