const passport = require("passport");
const router = require("express").Router();
const utils = require("./utils");

router.post("/register", (req, res, next) => {
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
        console.log(token)
        return res.status(200).json(token);
    })(req, res, next);
});

module.exports = router;
