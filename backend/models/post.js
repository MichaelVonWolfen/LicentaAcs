const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
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
        ref:"categories"
    },
    authorID:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
})

module.exports = mongoose.models.posts || mongoose.model("posts",postSchema)