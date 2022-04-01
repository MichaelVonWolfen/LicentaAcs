const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    authorID:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"users"
    },
    postID:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"posts"
    },
    likesList:[{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }]
},{
    timestamps:true
})
module.exports = mongoose.models.comments || mongoose.model("comments",commentSchema)