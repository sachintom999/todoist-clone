const express = require("express")
const Section = require("../models/section")

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const section = await Section.create(req.body)
        res.status(200).json(section)
    } catch (error) {
        console.error(" error ", error)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
