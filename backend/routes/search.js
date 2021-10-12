const router = require("express").Router()
const Categories = require("../models/categorie")
const Posts = require("../models/post")

//search for categorie and post based on a string
router.get("/", async (req, res) => {
    try{
        const search_strings = req.body.search;
        console.log(search_strings)
        let posts = await Posts.find({
            title:{$regex:search_strings, $options:"i"}
        }, "title post_img")
        let categories = await Categories.find({
            name:{$regex:search_strings, $options:"i"}
        }, "name image")

        return res.send({categories,posts})
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }

    return res.sendStatus(403)

})
//TODO Get top n categorie by nb of likes
router.get("/top3", async (req, res) => {
    try{
        return res.send(await  Categories.getTop())
    }catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})

module.exports = router