const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/split-personality-blog')
    .then(r => console.log("Connected to mongoDB"))
    .catch(e => console.log(e));