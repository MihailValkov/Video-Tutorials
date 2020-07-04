const Course = require('../models/courseModel');
module.exports = {
    get : {
        home(req,res,next){
            Course.find({ isPublic : true}).lean().then(courses => {
                if(!req.user){
                courses = courses.sort((a,b)=> b.usersEntrolled.length- a.usersEntrolled.length).slice(0,3);
            } else {
                courses = courses.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt ))
            }
            res.render('home/home.hbs',{title:"Home Page", courses,...req.locals});
                }); 
            }
    },
    post : {}
}