const router = require("express").Router()
const Posts = require("../models/post")
const Categories = require("../models/categorie")
const mongoose = require("mongoose");
const requiredAuth = require("../middleware/auth");

// route to update likes
// route to delete like
router.patch("/:id",requiredAuth.userMiddleware, async (req, res) => {
    try{
        const {operation_type} = req.body;
        let user_id = req.user._id.toString()
        if(!operation_type || !user_id)
            return res.sendStatus(400)
        const id = req.params.id
        let post = await Posts.findById(id)
        if(!post)
            return res.sendStatus(404)
        if(operation_type.toLowerCase() === "add") {
            let already_liked = post.users_likes_IDS.filter(u_id => u_id.toString() === user_id)
            if(already_liked.length !== 0)
                return res.sendStatus(400)
            post.users_likes_IDS.push(user_id);
            post.like_nb++;
        }else if(operation_type.toLowerCase() === "remove"){
            post.like_nb--;
            post.users_likes_IDS = post.users_likes_IDS.filter(u_id => u_id.toString() !== user_id)
        }
        await post.save()
        return res.send("Post updated")
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
// read nb of likes of a post like
router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        let post = await Posts.findById(id)
        if(!post)
            return res.sendStatus(404)
        return res.send({likes:post.users_likes_IDS.length})
    }catch (e) {
        console.log(e)
        return  res.sendStatus(500)
    }
})
// route to create a post
router.post("/post",requiredAuth.userMiddleware, async(req, res) => {
    try{
        const {title, content, post_img, categoryID}  = req.body;
        let user_id = req.user._id.toString()
        if(!user_id || !title || !content || !post_img || !categoryID)
            return res.status(400).send("Not all required fields received")
        const category = await Categories.findById(categoryID)
        if(!category)
            return res.status(404).send("Category does not exist")
        await new Posts({
            title,
            content,
            post_img,
            categoryID,
            creatorID:user_id
        }).save()
        return res.sendStatus(201)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
// route to update a post
router.patch("/post/:post_id",requiredAuth.userMiddleware, async(req, res) => {
    try{
        let id = req.params.post_id;
        let user_id = req.user._id.toString();
        const {title, content, post_img, category_name}  = req.body;
        let post = await Posts.findById(id)
        if(post.creatorID.toString() !==  user_id) {
            return res.sendStatus(403)
        }
        const category = await Categories.findOne({name:category_name})
        if(!category)
            return res.status(404).send("Category does not exist")
        post.title = title;
        post.content = content;
        post.post_img = post_img;
        post.categoryID = category._id;
        await post.save()
        return res.sendStatus(200)
    }catch (e) {
        console.log(e)
        return res.send(400)
    }
})
// route to delete post
router.delete("/post/:id",requiredAuth.userMiddleware, async (req, res) => {
    try{
        let _id = req.params.id;
        let post = await Posts.findOne({_id: new mongoose.Types.ObjectId(_id)})
        let authorID = req.user._id.toString()
        if(post.creatorID.toString() !== authorID){
            return res.sendStatus(403)
        }
        let deleted_data = await Posts.deleteOne({_id})
        return res.send(deleted_data)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
// get a post
router.get("/post/:id", async (req, res) => {
    try{
        let post = await Posts.findById(req.params.id).populate("creatorID", "username")
        return res.send(post)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
module.exports = router