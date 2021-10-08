const validator = require("validate.js");
const isEmpty = require("is-empty");
const utils = require("../utils");

const constraints = {
    email: {
        presence: {
            message: "Nu ai introdus adresa de email.",
        },
        email: {
            message: "Adresă de email invalidă.",
        },
    },
    password: {
        presence: {
            message: "Nu ai introdus parola.",
        },
        length: {
            minimum: 6,
            maximum: 30,
            message: "Parola ar trebui sa contina intre 6 si 30 de caractere.",
        },
    },
};

module.exports = function validateLoginTeamInput(data) {
    let errors = utils.removeHeader(validator.validate(data, constraints));
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
