const User = require('../models/userModel');
module.exports = {
    get :{
        register(req,res,next){
            res.render('user/register.hbs')
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
            })
       
        }
    }
}