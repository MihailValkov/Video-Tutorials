
module.exports = {
    get : {
        home(req,res,next){
            res.render('home/home.hbs',{title:"Home Page", ...req.locals})
        }
    },
    post : {}
}