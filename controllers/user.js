const User = require('../models/userModel');
module.exports = {
    get :{
        register(req,res,next){
            res.render('user/register.hbs')
        },
        login(req,res,next){
            res.render('user/login.hbs')

        }
    },
    post :{
        register(req,res,next){
            const {username,password,"repeat-password":repeatPassword} = req.body;
            if(password !==repeatPassword ) {
                res.render('user/register.hbs',{
                    message :'Password and repeat password do not match!',username }); return;
            }
            User.findOne({username}).then(user=> {
                if(user) {
                    res.render('user/register.hbs', {
                        message : `Username '${username}' is already taken!`,
                        password,repeatPassword
                    }); return ;
                }

                User.create({username,password}).then(()=> {
                    res.redirect('/home/');
                })
            }).catch(next)
       
        },
        login(req,res,next){
           const {username , password} = req.body;
           User.findOne({username}).then((user)=> {
               if(!user) {
                   res.render('user/login.hbs', {
                       message: 'No such username',password
                   }); return;
               }
               if(password !== user.password){
                res.render('user/login.hbs', {
                    message: 'Username or Password is wrong!',username
                }); return;
            }
            res.redirect('/home/');
           }).catch(next)
        }
    }
}