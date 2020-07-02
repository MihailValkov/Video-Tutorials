require('dotenv').config();
const config = require('./config/config')[process.env.NODE_ENV];
const db = require('./config/db');
const app = require('express')();

db().then(()=>{

    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(config.port, console.log(`*** -> Server is listening on port: ${config.port} <- ***`));
})