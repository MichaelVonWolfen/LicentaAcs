const mongoose = require("mongoose")
const constants = require("./constants");
mongoose.connect(constants.mongoURL)
    .then(r => console.log("Connected to mongoDB"))
    .catch(e => console.log(e));