const jwtToken = require('./jwt');
module.exports = (needAccess = false) => {
    return async function(req,res,next) {
        try {
            const token = req.cookies[process.env.COOKIE_LOGIN] || '';
            const user = await jwtToken.verify(token);
            req.user= user;
            req.locals= {
                isLogged : req.user !== undefined,
                username : req.user ? req.user.username : false
            }
            return next();
            
        } catch (error) {
            if(needAccess=== true){
                res.redirect('/user/login'); return;
            }
            next();
        }
    }
    
    



}