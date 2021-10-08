const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        session: false,
        passReqToCallback: true,
    },
    async (req, username, password, done) => {
        User.findOne({name: username}).then((user) => {
            if (user) {
                return done({userName: "Exista deja un cont cu acest nume"}, false);
            }
            User.findOne({email: req.body.email}).then((user) => {
                if (user) {
                    return done({email: "Exista deja un cont cu acest email"}, false);
                }
                new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: password,
                }).save(async (error) => {
                    if (error) {
                        return done(error, false);
                    }
                    return done(null, true);
                });
            });
        });
    });
