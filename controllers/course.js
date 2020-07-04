const Course = require("../models/courseModel");
const User = require("../models/userModel");
const renderErrorMessage = require('../utils/errors');
module.exports = {
  get: {
    create(req, res, next) {
        res.render('course/create.hbs', {title:"Create Course Page", ...req.locals});
    },
    details(req,res,next){
        const {courseId}= req.params;
        Course.findById(courseId).lean().then((course)=> {
            
            const isCreator = req.user.id.toString() === course.creator.toString();
            const isEnrolled = course.usersEntrolled.find(x=> x.toString()=== req.user.id.toString())
            res.render('course/details.hbs', {course,title:"Details Page", ...req.locals,isCreator,isEnrolled });
        }).catch(next)
    },
    delete (req,res,next){
        const {courseId}= req.params;
        Course.findByIdAndRemove(courseId).then(()=> res.redirect('/home/')).catch(next)
    },
    edit(req,res,next){
        const {courseId}= req.params;
        Course.findById(courseId).lean().then(course=> {
            res.render('course/edit.hbs',{...req.locals, ...course,title :"Edit Course Page",courseTitle:course.title})
        }).catch(next)
    },
    join(req,res,next){
        const {courseId}= req.params;
        const userId= req.user.id;
        Promise.all ([
            Course.findByIdAndUpdate(courseId,{ $addToSet: { usersEntrolled : userId} }),
            User.findByIdAndUpdate(userId,{ $addToSet: { enrolledCourses : courseId} })
        ]).then(()=> { res.redirect(`../details/${courseId}`)})
        .catch(next)
    },
    search(req,res,next){
        const {search} = req.query;
        const regex= new RegExp(`.*${search}.*`,'i');
        Course.find({ isPublic : true,title: { $regex :regex}}).lean()
        .then((courses)=> {
            res.render('home/home.hbs', {title:"Home Page", courses,...req.locals})
        })
        
    }
  },
  post: {
    create(req, res, next) {
        const {title, description,imageUrl, isPublic} = req.body;
        const data = {title,description,imageUrl ,isPublic :isPublic==="on",
        createdAt : new Date().toLocaleString(), creator : req.user.id }
        Course.create(data)
         .then(()=> { res.redirect('/home/')})
         .catch(error => {
            renderErrorMessage(error,res,'course/create.hbs',
            {...data,courseTitle:title,...req.locals,title:"Create Course Page"},next);
         }) 
    },
    edit(req,res,next){
        const {title,description,imageUrl,isPublic}= req.body;
        const {courseId}= req.params;
        const data = {description,imageUrl,isPublic:isPublic === "on"}
        Course.findByIdAndUpdate(courseId,data ,{runValidators:true})
        .then((updated)=> res.redirect(`../details/${courseId}`))
        .catch(error => {
            renderErrorMessage(error,res,'course/edit.hbs',
            {_id:courseId,...data,courseTitle:title,...req.locals,title:"Edit Course Page"},next);
        })
    }
  },
};




