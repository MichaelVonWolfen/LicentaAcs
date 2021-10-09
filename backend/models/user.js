const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Token = require("./Token");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["ADMIN", "USER"],
        default:"USER"
    },
    profile_picture:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
// Hashes the password before saving it in the database
userSchema.pre("save", function (next) {
    // this is the document being saved (the team data)
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.statics.retrUserData = async function (reqUser) {
    let user = await this.findById(reqUser._id)
    return {
        username: user.username,
        profile_picture: user.profile_picture,
        email: user.email,
        role: user.role
    };
};
// Compares the password received with the hash stored
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Generates the token used for email verification
userSchema.methods.generateToken = function () {
    return new Token({
        userID: this._id,
        token: crypto.randomBytes(16).toString("hex"),
    });
};
module.exports = mongoose.models.users || mongoose.model("users", userSchema)