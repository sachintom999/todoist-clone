const Label = require("../models/label")

const getAllLabels = async (req, res) => {
    const projects = await Label.find({
        // owner: "99", // Replace with the actual user ObjectId TODO
    }).sort({ createdAt: -1 })

    return res.status(200).json(projects)
}

module.exports = { getAllLabels }
