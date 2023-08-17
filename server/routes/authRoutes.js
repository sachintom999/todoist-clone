const express = require("express")
const { createUser } = require("../controllers/authController")

const router = express.Router()

router.get("/", createUser)

module.exports = router
