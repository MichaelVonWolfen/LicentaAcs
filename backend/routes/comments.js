const router = require("express").Router()
let Comments = require("../models/comment")
const mongoose = require("mongoose");
//route to create comments
router.post("/", async(req, res) => {
    try {
        let authorID = req.user._id.toString()
        let {postID, content} = req.body;
        await new Comments({
            postID,
            authorID,
            content
        }).save()
        return res.sendStatus(201)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
//route to read comments
router.get("/:post_id",async(req, res) => {
    try {
        let postID = req.params.post_id;
        let comments = await Comments.find({postID}).populate("authorID", "username")
        return res.send(comments)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
//Route to update comments
router.patch("/:comment_id",async(req, res) => {
    try {
        let _id = req.params.comment_id;
        let {content} = req.body;
        await Comments.findOneAndUpdate({_id: new mongoose.Types.ObjectId(_id)}, {content})
        return res.sendStatus(200)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
//Route to delete comments
router.delete("/:comment_id",async(req, res) => {
    try {
        let _id = req.params.comment_id;
        await Comments.findByIdAndRemove(_id)
        return res.sendStatus(200)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
module.exports = router
