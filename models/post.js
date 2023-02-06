const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: {type:String,required: true},
    firstName: {type:String, required: true, min:2, max:50},
    lastName: {type:String, required: true, min:2, max:50},
    location: {type:String},
    description:{type:String},
    userPicturePath: {type:String,required:true},
    picturePath: {type:String,default:""},
    likes:{
        type: Map,
        of: Boolean  
    },
    comments: {
      type: Array,
      default: [],
    }
},{timestamps: true});

const postModel = mongoose.model('postModel',postSchema);

module.exports = postModel;