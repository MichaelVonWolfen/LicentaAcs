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
commentSchema.statics.retrPostCommentData = async function (postID, user_id) {
    let comments = await this.find({postID}).populate("authorID", ["username", "profile_picture"]).sort({createdAt: 'desc'})
    comments = comments.map(comment=>{
        return {
            _id: comment._id,
            authorID: comment.authorID,
            content: comment.content,
            postID,
            createdAt:comment.createdAt,
            likesNB: comment.likesList.length,
            isLikedByUser: comment.likesList.find(userID => user_id.toString() === userID.toString()) !== undefined
        };
    })
    return comments
};
module.exports = mongoose.models.comments || mongoose.model("comments",commentSchema)