const jwt = require("jsonwebtoken");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const keys = require("../constants");

module.exports = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        session: false,
        passReqToCallback: true,
    },
    (req, email, password, done) => {
        User.findOne({email}, (error, user) => {
            if (error) {
                return done(error, false);
            }
            if (!user || !user.comparePassword(password)) {
                return done({email: "Email sau parolă incorectă."}, false);
            }
            const payload = {id: user._id};
            const token = jwt.sign(payload, keys.jwtSecret);
            return done(null, token);
        });
    }
);
