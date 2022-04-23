const express = require("express");
// const bodyParser = require("body-parser");
const passport = require("passport");
const constants = require("./constants");
const app = express();
const PORT = constants.port || 5000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const {instrument} = require("@socket.io/admin-ui");
const cors = require("cors")
require("./db");
app.use(cors())

app.use(express.static("./uploads"))

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "http://127.0.0.1:5500",
            "https://admin.socket.io"
        ],
        credentials: true,
    },
});
instrument(io, {
    auth: false
});

require("dotenv").config();
// Bodyparser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json())
// Passport middleware
app.use(passport.initialize());

// Load passport strategies
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

const auth = require("./routes/auth");
const categories = require("./routes/categories")
const comments = require("./routes/comments")
const posts = require("./routes/posts")
const users = require("./routes/user")
const search = require("./routes/search")

app.use("/api/auth", auth);
app.use("/api/categories", categories)
app.use("/api/comments", comments)
app.use("/api/posts", posts)
app.use("/api/users", users)
app.use("/api/search", search)

const middlewares = require("./middleware/auth")

const userNameSpace = io.of(constants.namespaces.user)
    .use((socket, next) => {
        middlewares.userMiddleware(socket.handshake, undefined, next)
    })
const anonymousNameSpace = io.of(constants.namespaces.anonymous)
const userSocketsHandler = require("./websockets/users");
const anonymousSocketsHandler = require("./websockets/anonimous");
userNameSpace.on("connection", (socket) => {
    console.log(`User connected with id ${socket.id}`)
    userSocketsHandler(io, socket);
});
anonymousNameSpace.on("connection", (socket) => {
    console.log(`Anonymous user connected with id ${socket.id}`)
    anonymousSocketsHandler(io, socket);
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});