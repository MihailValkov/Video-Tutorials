const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    password : {
        type: mongoose.Schema.Types.String,
        required:true,
    },
    enrolledCourses : [{
        type:mongoose.Schema.Types.ObjectId, ref : 'Courses'
    }] 
});

module.exports = mongoose.model('User', userSchema);