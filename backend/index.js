require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const constants = require("./constants");
const app = express();
const PORT = constants.port || 5000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

require("dotenv").config();
// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Load passport strategies
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

const auth = require("./routes/auth");
const requiredAuth = require("./middleware/auth");
const categories = require("./routes/categories")
const comments = require("./routes/comments")
const posts = require("./routes/posts")
const users = require("./routes/user")

app.use("/api/auth", auth);
//TODO USER SHOULD NOT BE LOGGED TO SEE categories
app.use("/api/categories", requiredAuth.userMiddleware)
app.use("/api/categories", categories)
//TODO USER SHOULD NOT BE LOGGED TO SEE COMMENTS
app.use("/api/comments", requiredAuth.userMiddleware)
app.use("/api/comments", comments)
app.use("/api/posts", requiredAuth.userMiddleware)
app.use("/api/posts", posts)
app.use("/api/users", requiredAuth.userMiddleware)
app.use("/api/users", users)
io.on('connection', (socket) => {
    console.log('a user connected on ' + socket.id);
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});