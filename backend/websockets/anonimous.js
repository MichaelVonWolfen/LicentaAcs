const Comments = require("../models/comment");
module.exports = (io, socket) => {
    socket.emit("test", "Helllo from backend, anonymous!")
    socket.join(socket.handshake.headers.room_id)

    socket.on("test", ()=>{
        console.log("LOLOLOLO")
        socket.emit("rest", "PLM")
    })
    socket.on('getComments', async (postID, callback) => {
        try {
            let comments = await Comments.retrPostCommentData(postID, "")
            return callback(undefined,comments)
        } catch (e) {
            console.log(e)
            return callback("An error occured when processing your message.")
        }
    })
    socket.on("disconnect", () => {
        console.log(`User disconected ${socket.id}`)
        socket.rooms.clear()
    });
};