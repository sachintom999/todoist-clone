const express = require("express")
const {
    updateComment,
    addComment,
} = require("../controllers/commentController")

const router = express.Router()

router.patch("/:id", updateComment)
router.post("/create/:taskId", addComment)

module.exports = router
