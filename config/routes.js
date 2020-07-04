const routes = require('../routes')

module.exports = (app) => {
    
    app.use('/',routes.home);

    app.use('/user',routes.user);

    app.use('/course',routes.course);

    app.use('*', (req,res,next)=> {
        res.render('errors/404.hbs')
    })
}