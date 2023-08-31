const { pl } = require("date-fns/locale")
const Project = require("../models/project")
const Task = require("../models/task")
const User = require("../models/user")
const mongoose = require("mongoose")

const getAllProjects = async (req, res) => {
    const projects = await Project.find({
        // owner: "99", // Replace with the actual user ObjectId TODO
        name: { $ne: "Inbox" },
    }).sort({ createdAt: -1 })

    return res.status(200).json(projects)
}

const createProject = async (req, res) => {
    const projectDetails = req.body
    const owner = await User.findOne({})
    try {
        const project = await Project.create({ ...projectDetails, owner })
        return res.status(200).json(project)
    } catch (error) {
        console.error(" error ", error)
        res.status(500).json({ error: error.message })
    }
}

const getInboxTasks = async (req, res) => {
    console.log("187")

    const currentUser = await User.findOne({})

    try {
        const project = await Project.getDefaultProjectTasks(currentUser._id)
        return res.status(200).json(project)
    } catch (error) {
        console.error(" projectController  error at line 172 ::", error)
        return res.status(500).json(error)
    }
}

const getProjectTasks = async (req, res) => {
    console.log("first..")
    const { projectId } = req.params

    console.log("projectId", projectId)

    const project = await Project.findById(projectId).populate({
        path: "sections",
        populate: {
            path: "tasks",
            /*match: { parentTask: null },*/ model: "Task",
        },
    })

    console.log("project", project)
    return res.status(200).json(project)

    if (!project) {
        return res.status(404).json({ message: "no project found" })
    }
}

module.exports = {
    getAllProjects,
    getProjectTasks,
    getInboxTasks,
    createProject,
}
