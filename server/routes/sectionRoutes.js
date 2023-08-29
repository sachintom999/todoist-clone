const express = require("express")
const Section = require("../models/section")
const { createSection } = require("../controllers/sectionController")

const router = express.Router()

router.post("/", createSection)

module.exports = router
