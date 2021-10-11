const router = require("express").Router()
const Categories = require("../models/categorie")
const Posts = require("../models/post");
const mongoose = require("mongoose")
const requiredAuth = require("../middleware/auth");
router.post("/", requiredAuth.userMiddleware,async (req, res) => {
    try {
        const {name, image, style} = req.body
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
// get all posts from a category
router.get("/:category_id", async (req, res) => {
    try{
        const category_id = req.params.category_id
        const orderby = req.body;
        let post = await Posts.find({categoryID:new mongoose.Types.ObjectId(category_id)}).populate("creatorID", 'username').sort(orderby)
        return res.send(post)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
//get all categories
router.get("", async (req, res) => {
    try{
        let categories = await Categories.find({}).sort({createdAt:'desc'})
        console.log(categories)
        return  res.send(categories)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
module.exports = router
