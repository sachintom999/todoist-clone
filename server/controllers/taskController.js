const { query } = require("express")
const Task = require("../models/task")
const Project = require("../models/project")
const Section = require("../models/section")
const Label = require("../models/label")
const User = require("../models/user")
const Comment = require("../models/comment")
const mongoose = require("mongoose")
const { markSubtasksAsComplete } = require("../helpers/taskHelpers")

const createTask = async (req, res) => {
    console.log("req.body", req.body)
    const { title, desc } = req.body
    let { project } = req.body

    const currentUser = await User.findOne({})
    console.log("currentUser", currentUser)

    try {
        if (!project) {
            project = await Project.getDefaultProject(currentUser._id)
        }

        const task = await Task.create({
            title,
            desc,
            project: project._id,
            user: currentUser,
        })
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

    const tasks = await Task.find()
        .sort({ createdAt: -1 })
        .populate("subtasks")
        .populate("project")
        .populate("section")
        .populate("labels")

    const tasksWithSubtaskCounts = tasks.map(task => {
        const subtasks = task?.subtasks || []

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
    console.log("62")
    const { id } = req.params
    const task = await Task.getParentTaskWithSubtasks(id)
    // console.log("task", task)

    const subtasks = task?.subtasks || []

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

const reorderSubTasks = async (req, res) => {
    const { taskId } = req.params
    const { originalIndex, newIndex } = req.body

    try {
        // Find the parent task by taskId
        const parentTask = await Task.findById(taskId)

        if (!parentTask) {
            return res.status(404).json({ message: "Parent task not found" })
        }

        // Retrieve the subtask being reordered
        const subtaskToReorder = parentTask.subtasks[originalIndex]

        // Remove the subtask from its original position
        parentTask.subtasks.splice(originalIndex, 1)

        // Insert the subtask at the new position
        parentTask.subtasks.splice(newIndex, 0, subtaskToReorder)

        // Update the order field of all affected subtasks
        for (let i = 0; i < parentTask.subtasks.length; i++) {
            const subtaskId = parentTask.subtasks[i]
            const subtask = await Task.findById(subtaskId)
            if (subtask) {
                subtask.order = i
                await subtask.save()
            }
        }

        await parentTask.save()

        return res
            .status(200)
            .json({ message: "Subtask order updated successfully" })
    } catch (error) {
        console.error("Error updating subtask order:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
const reorderSectionTasks = async (req, res) => {
    const { sectionId } = req.params
    const { originalIndex, newIndex } = req.body

    try {
        // Find the parent task by taskId
        const section = await Section.findById(sectionId)

        if (!section) {
            return res.status(404).json({ message: "Parent task not found" })
        }

        // Retrieve the subtask being reordered
        const subtaskToReorder = section.tasks[originalIndex]

        // Remove the subtask from its original position
        section.tasks.splice(originalIndex, 1)

        // Insert the subtask at the new position
        section.tasks.splice(newIndex, 0, subtaskToReorder)

        // Update the order field of all affected tasks
        for (let i = 0; i < section.tasks.length; i++) {
            const taskId = section.tasks[i]
            const task = await Task.findById(taskId)
            if (task) {
                task.order = i
                await task.save()
            }
        }

        await section.save()

        return res
            .status(200)
            .json({ message: "Subtask order updated successfully" })
    } catch (error) {
        console.error("Error updating subtask order:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const moveTask = async (req, res) => {
    console.log(".......;.;.;.")
    // const { origSection, newSection, origIndex, newIndex } = req.body

    const { origSectionId, newSectionId, origIndex, newIndex } = req.body
    // const origSectionId = "64f19b4bccd3e6532e6db9ac"
    // const newSectionId = "64f19b4bccd3e6532e6db9ae"
    // const origIndex = 0
    // const newIndex = 0

    const task = await Task.findOne({
        section: origSectionId,
        order: origIndex,
    })
    const taskId = task._id

    const origSection = await Section.findById(origSectionId)
    const newSection = await Section.findById(newSectionId)

    console.log("task", task._id)
    console.log("origSection", origSection._id)
    console.log("newSection", newSection._id)

    // Remove the task from the old section and old index
    origSection.tasks.splice(origIndex, 1)

    // Insert the task into the new section and new index
    newSection.tasks.splice(newIndex, 0, taskId)

    // Update the task's section reference
    task.section = newSectionId

    // Update the order of tasks in the old section
    for (let i = 0; i < origSection.tasks.length; i++) {
        const taskId = origSection.tasks[i]
        const taskToUpdate = await Task.findById(taskId)
        if (taskToUpdate) {
            taskToUpdate.order = i
            await taskToUpdate.save()
        }
    }

    // Update the order of tasks in the new section
    for (let i = 0; i < newSection.tasks.length; i++) {
        const taskId = newSection.tasks[i]
        const taskToUpdate = await Task.findById(taskId)
        if (taskToUpdate) {
            taskToUpdate.order = i
            await taskToUpdate.save()
        }
    }

    // Save the changes for both sections
    await origSection.save()
    await newSection.save()
    await task.save()

    return res
        .status(200)
        .json({ message: "Task moved and reordered successfully" })
}

const updateTask = async (req, res) => {
    const { id } = req.params
    console.log("🔴 in updateTask req.body", req.body)

    let task

    if (["completed"] in req.body) {
        console.log("120")

        if (req.body.completed) {
            markSubtasksAsComplete(id)
                .then(() => {
                    console.log("All subtasks marked as complete")
                    // return res.status(200).json({ message: "success" })
                })
                .catch(error => {
                    console.error("Error marking subtasks as complete:", error)
                    // return res.status(500).json({ message: "error" })
                })
        } else {
            task = await Task.findOneAndUpdate(
                { _id: id },
                // { ...req.body },
                { $set: { ...req.body } },
                { new: true }
            )
            return res.status(200).json({ message: "success" })
        }
    }

    if (["subtask"] in req.body) {
        const subtask = await Task.create({
            title,
            desc,
            parentTask: parentTaskId, // Assign the parent task ID
        })

        task = await Task.findOneAndUpdate(
            { _id: parentTaskId },
            { $push: { subtasks: subtask._id } }, // Add subtask ID to the subtasks array
            { new: true }
        )
    }

    if (["comment"] in req.body) {
        console.log("134 comment in req body here...")

        const { comment: text } = req.body

        const comment1 = await Comment.create({
            text,
            // user: user._id,
            task: id, // Assign the comment to the Todoist Clone task
            reactions: [],
        })

        task = await Task.findOneAndUpdate(
            { _id: id },
            { $push: { comments: comment1._id } }, // Add subtask ID to the subtasks array
            { new: true }
        )
    } else {
        task = await Task.findOneAndUpdate(
            { _id: id },
            // { ...req.body },
            { $set: { ...req.body } },
            { new: true }
        )
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such task" })
    }

    // if (!task) {
    //     return res.status(404).json({ error: "no such task" })
    // }

    return res.status(200).json({ task })
}

const getTodayTasks = async (req, res) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    try {
        const filters = {
            // dueDate: { $lte: today },
            parentTask: null,
            completed: false,
        }

        const populateList = ["project", "section"]

        const tasks = await Task.getTasksByFilterAndPopulate(
            filters,
            populateList
        )

        return res.status(200).json(tasks)
    } catch (error) {
        console.error(" taskController  error at line 199 ::", error)
        return res.status(500).json({ error })
    }
}

// const getInboxTasks = async (req, res) => {
//     let project

//     const currentUser = await User.findOne({})
//     project = await Project.getDefaultProject(currentUser._id)

//     try {
//         const filters = {
//             project: project._id,
//             parentTask: null
//         }

//         const populateList = []

//         const tasks = await Task.getTasksByFilterAndPopulate(
//             filters,
//             populateList
//         )

//         return res.status(200).json(tasks)
//     } catch (error) {
//         console.error(" taskController  error at line 199 ::", error)
//         return res.status(500).json({ error })
//     }
// }

const searchTask = async (req, res) => {
    const { searchTerm } = req.params
    console.log("393", searchTerm)

    try {
        const tasks = await Task.find({
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { desc: { $regex: searchTerm, $options: "i" } },
            ],
        }).populate('project')
        const projects = await Project.find({
            $or: [{ name: { $regex: searchTerm, $options: "i" } }],
        })
        const sections = await Section.find({
            $or: [{ name: { $regex: searchTerm, $options: "i" } }],
        }).populate('project')
        const labels = await Label.find({
            $or: [{ name: { $regex: searchTerm, $options: "i" } }],
        })

        const result = { projects, sections, labels, tasks }

        return res.status(200).json(result)
    } catch (error) {
        console.error(" taskController  error at line 397 ::", error)
        return res.status(500).json(error)
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    deleteTask,
    updateTask,
    getTodayTasks,
    reorderSubTasks,
    reorderSectionTasks,
    moveTask,
    searchTask,
    // getInboxTasks,
}
