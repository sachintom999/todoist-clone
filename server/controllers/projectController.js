const Project = require("../models/project")

const getAllProjects = async (req, res) => {
    const projects = await Project.find({
        // owner: "99", // Replace with the actual user ObjectId TODO
        name: { $ne: "Inbox" },
    }).sort({ createdAt: -1 })

    return res.status(200).json(projects)
}

module.exports = { getAllProjects }
