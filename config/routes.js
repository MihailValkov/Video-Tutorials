const routes = require('../routes')

module.exports = (app) => {
    
    app.use('/',routes.home);

    app.use('/user',routes.user);
}