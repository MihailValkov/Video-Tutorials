const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title : {
        type :mongoose.Schema.Types.String,
        required:true,
        unique:true,
        minlength: [4, "The title should be at least 4 characters!"]
    },
    description : {
        type :mongoose.Schema.Types.String,
        required:true,
        maxlength : [50, "The description should be max length 50 characters!"],
        minlength: [20, "The description should be at least 20 characters long!"]
    },
    imageUrl : {
        type :mongoose.Schema.Types.String,
        required:true,
        validate : {
            validator: (x) => {
                return /^http:\/\/.+|https:\/\/.+/.test(x);
            },
            message : () => 'The imageUrl should be starts with http or https!'
        }
    },
    isPublic : {
        type :mongoose.Schema.Types.Boolean,
        default:false,
    },
    creator : { type:mongoose.Schema.Types.ObjectId , ref:"User" },
    createdAt : {
        type :mongoose.Schema.Types.String,
    },
    usersEntrolled : [{ type:mongoose.Schema.Types.ObjectId, ref:"User" }]

})

module.exports = mongoose.model('Course', courseSchema);