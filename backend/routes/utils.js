const validateRegisterTeamInput = require("../validation/user/register");
const validateLoginTeamInput = require("../validation/user/login");

module.exports = {
    constructResponse: function (res, statusCode, title, body, error = true) {
        return res.status(statusCode).json({
            title: title,
            body: body,
            error: error,
        });
    },
    validateRegisterTeamInput: validateRegisterTeamInput,
    validateLoginTeamInput: validateLoginTeamInput,
};
