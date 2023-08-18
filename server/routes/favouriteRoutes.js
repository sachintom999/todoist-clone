const express = require("express")
const { getFavourites } = require("../controllers/favouriteController")

const router = express.Router()

router.get("/", getFavourites)

module.exports = router
