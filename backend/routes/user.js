const router = require("express").Router()
const requiredAuth = require("../middleware/auth");

//TODO Create an update picture route
//TODO Create user read route
router.get("",requiredAuth.userMiddleware,(req, res) => {
    return res.send("Succes /api/users")
})

module.exports = router