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
const users = require("./routes/user")

app.use("/api/auth", auth);
app.use("/api/users", requiredAuth.userMiddleware)
app.use("/api/users", users)
io.on('connection', (socket) => {
    console.log('a user connected on ' + socket.id);
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});