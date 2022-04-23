const router = require("express").Router()
const Categories = require("../models/categorie")
const Posts = require("../models/post");
const Comments = require("../models/comment")
const Users = require("../models/user")
const mongoose = require("mongoose")
const requiredAuth = require("../middleware/auth");
const multer  = require('multer')
const uuid = require("uuid").v4

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads/categories/');
    },
    filename: function (req, file, callback) {
        let ext = file.originalname.split(".")
        ext = ext[ext.length - 1]
        callback(null, `${uuid()}.${ext}`);
    }
});
const upload = multer({ storage })
router.get("/homeData", async (req, res)=>{
    try{
        let postNB = await Posts.count({})
        let comments = await Comments.count({})
        let categories = await Categories.count({})
        let users = await Users.count({})
        return res.send({
            posts: postNB,
            users: users,
            categories: categories,
            comments
        })
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
router.post("/", requiredAuth.userMiddleware, upload.single("image"), async (req, res) => {
    try {
        const {name} = req.body
        const style = {
            "primary_color":req.body.primary_color,
            "secondary_color":req.body.secondary_color
        }
        const image = "categories/" + req.file.filename
        let copy_category = await Categories.findOne({name})
        if (copy_category) {
            return res.status(400).send("Category already exists")
        }
        await new Categories({
            name,
            image,
            style
        }).save()
        return res.sendStatus(201)
    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
router.patch("/:id",requiredAuth.userMiddleware, async (req, res) => {
    try{
        const {name, image, style} = req.body
        const id = req.params.id
        await Categories.findOneAndUpdate({_id:id}, {name, image, style})
        res.sendStatus(201)
    }catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})
router.delete("/:name",requiredAuth.userMiddleware, async (req, res) => {
    try {
        let category_name = req.params.name
        await Categories.deleteMany({name: category_name})
        return res.send(`Deleted ${category_name}`)
    } catch (e) {
        console.log(e)
        return res.status(500).send("Something went wrong")
    }
})
// get all post from a category
router.get("/:category_id", async (req, res) => {
    try{
        const category_id = req.params.category_id
        let orderby = {}
        let parsedQuery = {};
        if(req.query.sort){
            parsedQuery = JSON.parse(req.query.sort)
            orderby =[[parsedQuery.sortBy, parsedQuery.value]]
        }
        // console.log(orderby)
        let category = await Categories.find({_id:new mongoose.Types.ObjectId(category_id)})
        let posts = await Posts.find({categoryID:new mongoose.Types.ObjectId(category_id)}).populate("creatorID", 'username').sort(orderby).lean()
        posts = await Promise.all(
            posts.map( async (post) =>{
                let comments = await Comments.find({postID:new mongoose.Types.ObjectId(post._id)})
                return {
                    ...post,
                    commNb:comments.length
                }
            })
        );
        if(parsedQuery.sortBy === 'commNb')
            posts = posts.sort((a,b) => parsedQuery.value * (b.commNb - a.commNb))
        return res.send({
            category:category[0],
            postsList:posts
        })
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
//get all categorie
router.get("", async (req, res) => {
    try{
        let categories = await Categories.find({}).sort({createdAt:'desc'})
        // console.log(categories)
        return  res.send(categories)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
module.exports = router
