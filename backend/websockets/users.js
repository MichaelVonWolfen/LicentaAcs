module.exports = (io, socket) => {
    socket.on("disconnect", () => {
        console.log(`User disconected ${socket.id}`)
    });
};