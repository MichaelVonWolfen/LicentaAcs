const mongoose = require("mongoose")
const styleSchema = new mongoose.Schema({
    btn_color:{
        type:String,
        required:true
    },
    btn_bkg:{
        type:String,
        required:true
    },
    pg_color:{
        type:String,
        required:true
    },
    pg_bkg:{
        type:String,
        required:true
    },
    anchor_color:{
        type:String,
        required:true
    },
    anchor_bkg:{
        type:String,
        required:true
    },
    background_elements:[{
      type:String
    }]

})
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    style:{
        type:styleSchema
    }
},{
    timestamps:true
})

module.exports = mongoose.models.categories || mongoose.model("categories",categorySchema)