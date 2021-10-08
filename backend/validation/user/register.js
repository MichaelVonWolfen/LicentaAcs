const validator = require("validate.js");
const isEmpty = require("is-empty");
const utils = require("../utils");

const constraints = {
    username: {
        presence: {
            message: "Nu ai introdus numele echipei.",
        },
        length: {
            minimum: 1,
            message: "Nu ai introdus numele echipei.",
        },
    },
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
            maximum: 30,
            message: "Parola trebuie să aibă între 6 și 30 de caractere.",
            minimum: 6,
        },
    },
    confirmationPassword: {
        presence: {
            message: "Nu ai introdus parola de confirmare.",
        },
        equality: {
            attribute: "password",
            message: "Parola de confirmare nu coincide cu parola inițială.",
        },
    },
};

module.exports = function validateRegisterTeamInput(data) {
    let errors = utils.removeHeader(validator.validate(data, constraints));
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
