const User = require('../models/userModel');
const jwtToken = require('../utils/jwt');
const renderErrorMessage = require('../utils/errors');
module.exports = {
    get: {
        register(req, res, next) {
            res.render('user/register.hbs', {title:"Register Page"})
        },
        login(req, res, next) {
            res.render('user/login.hbs',{title:"Login Page"})
        },
        logout(req, res, next) {
            req.user = null;
            res.clearCookie(process.env.COOKIE_LOGIN).redirect('/home/')
        },
        profile(req,res,next){
            User.findById(req.user.id).populate("enrolledCourses").lean().then(user=> {
                const count =user.enrolledCourses.length;
                const courses = user.enrolledCourses.map(x=> x=x.title).join(", ");
                res.render('user/profile.hbs',{title:"Profile Page", ...req.locals,count,courses,male:user.male})
            })
        }
    },
    post: {
        register(req, res, next) {
            const { username, password, "repeat-password": repeatPassword ,male,female} = req.body;
            const data= {username, password,repeatPassword,title:"Register Page",male:male ==="on",female:female === "on"};
            if (password !== repeatPassword) {
                res.render('user/register.hbs', {
                    message: 'Password and repeat password do not match!', username,title:"Register Page"
                    ,male,female
                }); return;
            }
            User.findOne({ username }).then(user => {
                if (user) {
                     res.render('user/register.hbs', {
                        message: `Username '${username}' is already taken!`,...data });
                        return;
                }
                return User.create({ username, password, male:male ==="on",female:female === "on" }).then(()=> {
                    res.redirect('/user/login');return;
                })
            }).catch(error => renderErrorMessage(error,res,'user/register.hbs',{...data},next))

        },
        login(req, res, next) {
            const { username, password } = req.body;
            const data= {username, password,title:"Register Page"};
            User.findOne({ username }).then((user) => {
                if (!user) {
                     res.render('user/login.hbs', {message: 'No such username', password ,title:"Login Page"}); return ;}
                user.verifyPasswords(password).then(match => {
                    if (!match) {
                        res.render('user/login.hbs', { message: "Username or password don't match!",...data}); return; }
                    const token = jwtToken.create({ id: user._id, username: user.username });
                    res.cookie(process.env.COOKIE_LOGIN, token).redirect('/home/');
                });
            }).catch(error => renderErrorMessage(error,res,'user/login.hbs',{...data,title:"Login Page"},next))
        }
    }
}