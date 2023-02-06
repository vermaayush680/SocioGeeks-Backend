const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{type: String, required: true, min: 2, max:50},
    lastName:{type: String, required: true, min: 2, max:50},
    email:{type: String, required: true, unique:true},
    password:{type: String, required: true, min: 8},
    picturePath:{type: String, default:""},
    friends:{type: Array, default:[]},
    location:{type: String},
    occupation:{type: String},
    viewedProfile:{type: Number},
    impressions:{type: Number},
},{timestamps: true});

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;