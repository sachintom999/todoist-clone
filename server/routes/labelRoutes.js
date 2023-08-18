const express = require("express")
const { getAllLabels } = require("../controllers/labelController")

const router = express.Router()

router.get("/", getAllLabels)

module.exports = router
