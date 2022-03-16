const router = require("express").Router()
const requiredAuth = require("../middleware/auth");
const Users = require("../models/user")
//TODO Create an update picture route
//TODO Create user read route
router.get("/user",requiredAuth.userMiddleware,(req, res) => {
    let user = req.user
    user.password = null
    user.createdAt = null
    user.updatedAt = null
    user.role = null
    user.email = null
    return res.send(user)
})

module.exports = router