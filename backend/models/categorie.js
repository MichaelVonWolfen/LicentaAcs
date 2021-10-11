const mongoose = require("mongoose")
const constants = require("../constants");
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
    timestamps:true,
    toObject : {virtuals:true},
    toJSON:{virtuals:true}
})
categorySchema.virtual("posts",{
    ref:"posts",
    localField:"_id",
    foreignField:"categoryID"
})
categorySchema.static("getTop", async function () {
    const categories = await this.find({}).populate("posts")
    let categories_returned = []
    for (let categoriesKey in categories) {
        let posts_likes = 0
        categories[categoriesKey].posts.forEach(post =>{
            posts_likes +=post.users_likes_IDS.length
        })
        categories_returned.push({
            name:categories[categoriesKey].name,
            posts_likes:posts_likes
        })
    }
    categories_returned.sort((a,b) =>  b.posts_likes - a.posts_likes)
    categories_returned = categories_returned.slice(0,constants.max_top_categories_total)
    return categories_returned
})
module.exports = mongoose.models.categories || mongoose.model("categories",categorySchema)