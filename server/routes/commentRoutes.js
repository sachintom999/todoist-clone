const express = require("express")
const { updateComment } = require("../controllers/commentController")

const router = express.Router()

router.patch("/:id", updateComment)

module.exports = router
