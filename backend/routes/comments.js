const router = require("express").Router()
let Comments = require("../models/comment")
const mongoose = require("mongoose")
const requiredAuth = require("../middleware/auth");

//route to create comments
router.get("/", requiredAuth.userMiddleware, async (req, res) =>{
    try {
        let comments = await Comments.find({})
            .populate("authorID", "username")
            .populate("postID", "title")
            .lean()
        comments = comments.map(comment =>{
            comment = {
                ...comment,
                "Author": comment["authorID"]["username"] || "none",
                "Post": comment["postID"]["title"] || "none",
                "Likes": comment["likesList"].length || 0
            }
            delete comment["authorID"]
            delete comment["postID"]
            delete comment["likesList"]
            return comment
        })
        return res.send( comments)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
router.post("/",requiredAuth.userMiddleware, async(req, res) => {
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
//Route to alter the number of likes
// router.patch("/like",requiredAuth.userMiddleware, async (req, res) => {
//     try {
//         let _id = req.body.commentID;
//         let authorID = req.user._id.toString()
//         let comment = await Comments.findOne({
//             $and:[
//                 {_id: new mongoose.Types.ObjectId(_id)},
//                 {likesList: new mongoose.Types.ObjectId(authorID)}
//             ]
//         })
//         if(comment !== null)
//             await Comments.updateOne({_id:new mongoose.Types.ObjectId(_id)},{
//                 $pullAll:{likesList:[authorID]}
//             })
//         else
//         //else add like
//         await Comments.updateOne({_id:new mongoose.Types.ObjectId(_id)},{
//             $push:{likesList:[authorID]}
//         })
//         return res.sendStatus(200)
//     }catch (e) {
//         console.log(e)
//         return res.sendStatus(500)
//     }
// })
//route to read comments
// router.get("/:post_id",async(req, res) => {
//     try {
//         let postID = req.params.post_id;
//         let comments = await Comments.find({postID}).populate("authorID", ["username", "profile_picture"]).sort({createdAt:'desc'})
//         return res.send(comments)
//     }catch (e) {
//         console.log(e)
//         return res.sendStatus(500)
//     }
// })
//Route to update comments
router.patch("/:comment_id",requiredAuth.userMiddleware,async(req, res) => {
    try {
        let _id = req.params.comment_id;
        let {content} = req.body;
        let comment = await Comments.findOne({_id: new mongoose.Types.ObjectId(_id)})
        let authorID = req.user._id.toString()
        if(comment.authorID.toString() !== authorID){
            return res.sendStatus(403)
        }
        comment.content = content
        await comment.save()
        return res.sendStatus(200)
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
//Route to delete comments
router.delete("/:comment_id",requiredAuth.userMiddleware, async(req, res) => {
    try {
        let _id = req.params.comment_id;
        let comment = await Comments.findOne({_id: new mongoose.Types.ObjectId(_id)})
        let authorID = req.user._id.toString()
        if(comment.authorID.toString() !== authorID){
            return res.sendStatus(403)
        }
        await Comments.findByIdAndRemove(_id)
        return res.send("Comment deleted")
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})
module.exports = router
