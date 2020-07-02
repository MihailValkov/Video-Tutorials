const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title : {
        type :mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    description : {
        type :mongoose.Schema.Types.String,
        required:true,
        maxlength : [50, "description should be max length 50 characters !"]
    },
    imageUrl : {
        type :mongoose.Schema.Types.String,
        required:true,
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