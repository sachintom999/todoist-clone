const Task = require("../models/task")

async function markSubtasksAsComplete(taskId) {
    const task = await Task.findById(taskId)
    if (!task) {
        return
    }

    // Mark the task as complete
    task.completed = true
    await task.save()

    // Recursively mark subtasks as complete
    for (const subtaskId of task.subtasks) {
        await markSubtasksAsComplete(subtaskId)
    }
}

module.exports = { markSubtasksAsComplete }
