const Label = require("../models/label")
const Project = require("../models/project")

const getFavourites = async (req, res) => {
    const userId = "userObjectId99" // Replace with the actual ObjectId of the user

    const favoriteProjects = await Project.find({
        // owner: userId,
        favourite: true,
    }).select("_id name color")

    const favoriteLabels = await Label.find({
        // user: userId,
        favourite: true,
    }).select("_id name")

    const response = {
        projects: favoriteProjects,
        labels: favoriteLabels,
    }

    return res.status(200).json(response)
}

module.exports = { getFavourites }
