const { query } = require("express")
const Task = require("../models/task")
const mongoose = require("mongoose")

const createTask = async (req, res) => {
    console.log("req.body", req.body)
    const { title, desc } = req.body
    // const user_id = req.user._id
    const emptyFields = []

    if (!title) {
        emptyFields.push("title")
    }

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill all the fields", emptyFields })
    }

    try {
        const task = await Task.create({ title, desc })
        return res.status(201).json(task)
    } catch (error) {
        console.error("   error  ::", error)
        return res.status(400).json({ error: error.message })
    }
}

const getAllTasks = async (req, res) => {
    console.log("31")
    const query = req.query
    console.log("query", query)

    const tasks = await Task.find().sort({ createdAt: -1 }).populate("subtasks")

    const tasksWithSubtaskCounts = tasks.map(task => {
        const subtasks = task.subtasks || []

        // Calculate the number of completed and non-completed subtasks
        const completedSubtasks = subtasks.filter(subtask => subtask.completed)
        const nonCompletedSubtasks = subtasks.filter(
            subtask => !subtask.completed
        )

        return {
            ...task._doc, // Convert the Mongoose document to a plain object
            completedSubtasksCount: completedSubtasks.length,
            nonCompletedSubtasksCount: nonCompletedSubtasks.length,
        }
    })
    // console.log("tasksWithSubtaskCounts", tasksWithSubtaskCounts)
    return res.json(tasksWithSubtaskCounts)
}

const getSingleTask = async (req, res) => {
    const { id } = req.params
    const task = await Task.getParentTaskWithSubtasks(id)
    // console.log("task", task)

    const subtasks = task.subtasks || []

    // Calculate the number of completed and non-completed subtasks
    const completedSubtasks = subtasks.filter(subtask => subtask.completed)
    const nonCompletedSubtasks = subtasks.filter(subtask => !subtask.completed)

    // return { ...task._doc, completedSubtasks, nonCompletedSubtasks, }

    if (!task) {
        return res.status(404).json({ error: "no such task" })
    }
    return res
        .status(200)
        .json({ ...task._doc, completedSubtasks, nonCompletedSubtasks })
}
// const getSingleTask = async (req, res) => {
//     const { id } = req.params
//     const task = await Task.findById(id)
//     if (!task) {
//         return res.status(404).json({ error: "no such task" })
//     }
//     return res.status(200).json(task)
// }

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "no such task" })
        }
        const task = await Task.findOneAndDelete({ _id: id })
        if (!task) {
            return res.status(404).json({ error: "no such task" })
        }
        return res.status(200).json({ task })
    } catch (error) {
        console.error("error  ::", error)
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such task" })
    }

    const task = await Task.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    )
    if (!task) {
        return res.status(404).json({ error: "no such task" })
    }

    return res.status(200).json({ task })
}

module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    deleteTask,
    updateTask,
}