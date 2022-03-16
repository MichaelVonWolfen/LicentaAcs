const jwt = require("jsonwebtoken")
const constants = require("../constants")
const Users = require("../models/user")

let errTemplate = new Error("conn_failed");
module.exports = {
    userMiddleware: (req, res, next) =>{
        if (!req.headers.authorization) {
            console.log("Token not found.");
            if (res !== undefined) {
                return res.status(400).json({ message: "Unauthorized access" });
            } else {
                errTemplate.data = { reason: "Unauthorized access" };
                return next(errTemplate);
            }
        }
        // The authorization header is a string like "Bearer $token"
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, constants.jwtSecret, (error, decoded) => {
            if (error) {
                console.log("Token not valid. JWT failed.");
                if (res !== undefined) {
                    return res.status(400).json({ message: "Unauthorized access" });
                } else {
                    errTemplate.data = { reason: "Unauthorized access" };
                    return next(errTemplate);
                }
            }

            const userID = decoded.id;
            Users.findById(userID, (error, user) => {
                if (error || !user) {
                    if (res !== undefined) {
                        return res
                            .status(400)
                            .json({ email: "Nu există niciun cont asociat cu acest nume." });
                    } else {
                        errTemplate.data = {
                            reason: "Nu există niciun cont asociat cu acest nume.",
                        };
                        return next(errTemplate);
                    }
                }
                req.user = user;
                return next();
            });
        });
    },
    admin: (req, res, next)=>{
        return next()
    }
}
