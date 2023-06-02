const express= require("express")
const router = express.Router()

const authController = require("../controllers/authController")

router.post("/member-login",authController.login)
router.post("/member-register",authController.register)

module.exports = router