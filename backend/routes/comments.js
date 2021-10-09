const router = require("express").Router()
//TODO Add route to create comments
//TODO Add route to read comments
//TODO Add route to update comments
//TODO Add route to delete comments
router.get("",(req, res) => {
    return res.send("Succes /api/comments")
})

module.exports = router