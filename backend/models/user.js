const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["ADMIN", "USER"],
        default:"USER"
    },
    profile_picture:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.models.users || mongoose.model("users", userSchema)