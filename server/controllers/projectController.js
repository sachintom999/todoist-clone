const { utcToZonedTime } = require("date-fns-tz")
const { startOfDay, endOfDay, format, subMilliseconds } = require("date-fns")
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
        options: { sort: { order: 1 } },
        populate: {
            path: "tasks",
            model: "Task",
        },
    })

    console.log("project", project)
    return res.status(200).json(project)

    if (!project) {
        return res.status(404).json({ message: "no project found" })
    }
}

const getTodayTasks = async (req, res) => {
    const userTimeZone = "Asia/Kolkata"

    // for the current day
    const moment = require("moment-timezone")
    var startOfToday = moment().tz(userTimeZone).startOf("day").utc().toDate()
    var endOfToday = moment().tz(userTimeZone).endOf("day").utc().toDate()

    const todayTasks = await Task.find({
        // user: userId,
        parentTask: null,
        completed:false,
        dueDate: {
            $gte: startOfToday,
            $lte: endOfToday,
        },
    })

    const overdueTasks = await Task.find({
        // user: userId,
        parentTask: null,
        completed:false,
        dueDate: {
            $lt: startOfToday, // Due date is less than start of yesterday (overdue)
        },
    })

    const sections = [
        { id: "111", name: "Overdue", tasks: overdueTasks },
        { id: "222", name: "Today", tasks: todayTasks },
    ]

    const project = { name: "Today", sections }

    return res.status(200).json(project)
}

/*
project {
  _id: new ObjectId("64f2a7d9e26857cc0601737b"),
  name: 'Work Project',
  owner: new ObjectId("64f2a7d8e26857cc06017375"),
  sections: [
    {
      _id: new ObjectId("64f2a7d9e26857cc06017381"),
      name: 'Review',
      project: new ObjectId("64f2a7d9e26857cc0601737b"),
      order: 1,
      tasks: [Array],
      createdAt: 2023-09-02T03:11:21.167Z,
      updatedAt: 2023-09-02T03:11:21.621Z,
      __v: 1
    },
    {
      _id: new ObjectId("64f2a7d9e26857cc0601737f"),
      name: 'Coding',
      project: new ObjectId("64f2a7d9e26857cc0601737b"),
      order: 2,
      tasks: [Array],
      createdAt: 2023-09-02T03:11:21.128Z,
      updatedAt: 2023-09-02T03:11:21.655Z,
      __v: 1
    }
  ],
  tasks: [],
  color: '#11c023',
  favourite: true,
  isInbox: false,
  createdAt: 2023-09-02T03:11:21.056Z,
  updatedAt: 2023-09-02T03:11:21.253Z,
  __v: 1
}

*/

module.exports = {
    getAllProjects,
    getProjectTasks,
    getInboxTasks,
    createProject,
    getTodayTasks,
}
