const Course = require("../models/courseModel");
module.exports = {
  get: {
    create(req, res, next) {
        res.render('course/create.hbs', {title:"Course Page", ...req.locals});
    },
  },
  post: {
    create(req, res, next) {
        const {title, description,imageUrl, isPublic} = req.body;

        Course.create({title,description,imageUrl ,isPublic :isPublic==="on",
         createdAt : new Date().toLocaleString(), creator : req.user._id})
         .then(()=> { res.redirect('/home/')})
         .catch(next) 
    },
  },
};
