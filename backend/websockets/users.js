const Comments = require("../models/comment");
const mongoose = require("mongoose");
module.exports = (io, socket) => {
    console.log("User connected")
    socket.emit("connection", "Hy")
    socket.emit("test", "Helllo from backend, user!")
    socket.join(socket.handshake.headers.room_id)

    socket.on('getComments', async (postID, callback) => {
        console.log("Entered get comments event.")
        console.log("Got comments")
        try {
            let comments = await Comments.find({postID}).populate("authorID", ["username", "profile_picture"]).sort({createdAt: 'desc'})
            return callback(undefined,comments)
        } catch (e) {
            console.log(e)
            if(callback)
                return callback("An error occured when processing your message.")
        }
    })
    socket.on("likeChange", async (commentID, callback)=>{
        try {
            const user = socket.handshake.user
            let authorID = user._id.toString()
            let comment = await Comments.findOne({
                $and:[
                    {_id: new mongoose.Types.ObjectId(commentID)},
                    {likesList: new mongoose.Types.ObjectId(authorID)}
                ]
            })
            let commentData;
            if(comment !== null)
                commentData = await Comments.findOneAndUpdate({_id:new mongoose.Types.ObjectId(commentID)},{
                    $pullAll:{likesList:[authorID]}
                },{new:true})
            else
                //else add like
                commentData= await Comments.findOneAndUpdate({_id:new mongoose.Types.ObjectId(commentID)},{
                    $push:{likesList:[authorID]}
                },{new:true})
            const payload = {
                commentID:commentData._id,
                likesNB:commentData.likesList.length
            }
            const postID = commentData.postID.toString()

            socket.nsp.to(postID).emit("updated_likes", payload)
            io.of("anonimous").to(postID).emit("updated_likes", payload)
            callback(undefined)
        }catch (e) {
            console.log(e)
            if(callback)
                callback("Error on changing comment like state.")
        }
    })
    socket.on("disconnect", () => {
        console.log(`User disconected ${socket.id}`)
        socket.rooms.clear()
    });
};