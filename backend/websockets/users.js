const Comments = require("../models/comment");
const mongoose = require("mongoose");
const constants = require("../constants");
module.exports = (io, socket) => {
    console.log("User connected")
    socket.emit("connection", "Hy")
    socket.emit("test", "Helllo from backend, user!")
    socket.join(socket.handshake.headers.room_id)

    socket.on("Debug", (msg) =>{
        console.log(msg)
    })
    socket.on('getComments', async (postID, callback) => {
        console.log("LOLO")
        try {
            let comments = await Comments.find({postID}).populate("authorID", ["username", "profile_picture"]).sort({createdAt: 'desc'})
            // console.log(comments)
            return callback(undefined,comments)
        } catch (e) {
            console.log(e)
            if(callback)
                return callback("An error occured when processing your message.")
        }
    })
    socket.on("newComment", async (postID, content) =>{
        console.log(content)
        try {
            let authorID = socket.handshake.user._id.toString()
            await new Comments({postID, authorID, content}).save()
            let comments = await Comments.find({postID}).populate("authorID", ["username", "profile_picture"]).sort({createdAt: 'desc'})

            socket.nsp.in(postID).emit("retrieveNewComment", comments)
            io.of(constants.namespaces.anonymous).in(postID).emit("retrieveNewComment", comments)
        }catch (e) {
            console.log(e)
        }
    })
    socket.on("likeChange", async (commentID, callback)=>{
        try {
            console.log(commentID)
            console.log("Like Change")
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
            const postID = commentData.postID.toString()
            let payload = await Comments.find({postID}).populate("authorID", ["username", "profile_picture"]).sort({createdAt: 'desc'})

            socket.to(postID).emit("updated_likes", payload)
            io.of(constants.namespaces.anonymous).to(postID).emit("updated_likes", payload)
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