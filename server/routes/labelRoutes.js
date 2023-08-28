const express = require("express")
const {
    getAllLabels,
    getTasksUnderLabel,
} = require("../controllers/labelController")

const router = express.Router()

router.get("/", getAllLabels)
router.get("/:labelId/tasks", getTasksUnderLabel)

module.exports = router
