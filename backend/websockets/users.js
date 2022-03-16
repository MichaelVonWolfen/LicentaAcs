const Comments = require("../models/comment");
const mongoose = require("mongoose");
module.exports = (io, socket) => {
    socket.emit("test", "Helllo from backend!")
    socket.on('getComments', async (postID, callback) => {
        try {
            let comments = await Comments.find({postID}).populate("authorID", ["username", "profile_picture"]).sort({createdAt: 'desc'})
            return callback(undefined,comments)
        } catch (e) {
            console.log(e)
            return callback("An error occured when processing your message.")
        }
    })
    socket.on("likeChange", async (commentID)=>{
        try {
            const user = socket.handshake.user
            let authorID = user._id.toString()
            let comment = await Comments.findOne({
                $and:[
                    {_id: new mongoose.Types.ObjectId(commentID)},
                    {likesList: new mongoose.Types.ObjectId(authorID)}
                ]
            })
            if(comment !== null)
                await Comments.updateOne({_id:new mongoose.Types.ObjectId(commentID)},{
                    $pullAll:{likesList:[authorID]}
                })
            else
                //else add like
                await Comments.updateOne({_id:new mongoose.Types.ObjectId(commentID)},{
                    $push:{likesList:[authorID]}
                })
        }catch (e) {
            console.log(e)
        }
    })
    socket.on("disconnect", () => {
        console.log(`User disconected ${socket.id}`)
    });
    };