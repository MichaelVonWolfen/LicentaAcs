const passport = require("passport");
const router = require("express").Router();
const utils = require("./utils");

const multer  = require('multer')
const uuid = require("uuid").v4
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads/users/');
    },
    filename: function (req, file, callback) {
        let ext = file.originalname.split(".")
        ext = ext[ext.length - 1]
        callback(null, `${uuid()}.${ext}`);
    }
});
const upload = multer({ storage })

router.post("/register",upload.single("profile_picture"),(req, res, next) => {
    console.log(req.body)
    const { errors, isValid } = utils.validateRegisterTeamInput(req.body);
    if (!isValid) {
        console.log(errors)
        return res.status(400).json(errors);
    }
    passport.authenticate("local-signup", (error) => {
        if (error) {
            console.log(error)
            return res.status(400).json(error);
        }
        return utils.constructResponse(
            res,
            200,
            "Înregistrare efectuată",
            "Felicitari! Acum te poti loga!"
        );
    })(req, res, next);
});

router.post("/login", (req, res, next) => {
    const { errors, isValid } = utils.validateLoginTeamInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    passport.authenticate("local-login", (error, token) => {
        if (error) {
            return res.status(400).json(error);
        }
        // console.log(token)
        return res.status(200).json(token);
    })(req, res, next);
});

module.exports = router;
