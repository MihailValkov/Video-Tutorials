const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password,salt);
            this.password = hash;
        } catch (error) {
            next(error);
            return;
        }
    }
    next();
} )

module.exports = mongoose.model('User', userSchema);