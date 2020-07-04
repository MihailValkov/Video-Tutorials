const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username : {
        type: mongoose.Schema.Types.String,
        required:true,
        unique:true,
        minlength : [5, "Username should be at least 5 characters long"],
        validate : {
            validator : (x)=> {
                return /^[A-Za-z0-9]+$/.test(x)
            },
            message : ()=> 'Username should consist only english letters and digits'
        }
    },
    password : {
        type: mongoose.Schema.Types.String,
        required:true,
        minlength : [5, "Password should be at least 5 characters long"],
        validate : {
            validator : (x)=> {
                return /^[A-Za-z0-9]+$/.test(x)
            },
            message : ()=> 'Password should consist only english letters and digits'
        }
    },
    male: { type : mongoose.Schema.Types.Boolean , default:false,},
    female: { type : mongoose.Schema.Types.Boolean , default:false,},
    enrolledCourses : [{
        type:mongoose.Schema.Types.ObjectId, ref : 'Course'
    }] 
});

userSchema.methods = {
    verifyPasswords : function(pass){
        return bcrypt.compare(pass,this.password)
    }
}

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