const Label = require("../models/label")

const getAllLabels = async (req, res) => {
    const labels = await Label.find({
        // owner: "99", // Replace with the actual user ObjectId TODO
    }).sort({ createdAt: -1 })

    return res.status(200).json(labels)
}

const getTasksUnderLabel = async (req, res) => {
    console.log("first")

    try {
        const { labelId } = req.params
        console.log("req.params", req.params)
        console.log("labelId", labelId)
        const label = await Label.findById(labelId).populate({
            path: "tasks",
            populate: [
                { path: "project" },
                { path: "section" },
                { path: "labels" },
            ],
        })

        return res.status(200).json(label)
    } catch (error) {
        console.error(" labelController  error at line 16 ::", error)
        return res.status(500).json(error)
    }
}
module.exports = { getAllLabels, getTasksUnderLabel }
