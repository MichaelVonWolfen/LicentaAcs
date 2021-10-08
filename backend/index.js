const express = require('express');
require("./db")
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const constants = require("./constants");
const io = new Server(server);
const PORT = constants.port
const userMiddleware = require("./middleware/auth").userMiddleware

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
app.get("/api", userMiddleware, (req, res)=>{
    res.send('<h1>Hello API world</h1>');
})
io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});