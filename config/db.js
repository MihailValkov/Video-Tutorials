const mongoose = require('mongoose');
const config = require('./config')[process.env.NODE_ENV];

module.exports= ()=> {
    return mongoose.connect(config.dataBase,{ useNewUrlParser: true,useUnifiedTopology: true },(err)=>{
        if(err){
            console.log('*** Something is wrong with DB ***');return;
        }
        console.log('*** -> Data base is running ! <- ****');
    })
}