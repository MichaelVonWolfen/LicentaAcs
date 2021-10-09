const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    post_img:{
        type:String
    },
    like_nb:{
        type:Number,
        default:0
    },
    categoryID:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"categories"
    },
    creatorID:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"users"
    },
    users_likes_IDS:[{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }]
},{
    timestamps:true
})

module.exports = mongoose.models.posts || mongoose.model("posts",postSchema)