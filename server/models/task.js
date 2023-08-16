const mongoose = require("mongoose")

const Schema = mongoose.Schema

const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        completed: { type: Boolean, required: true, default: false },
        dueDate: { type: Date, required: true, default: new Date() },
        subtasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
        priority: { type: Number, required: true, default: 4 },
        labels: { type: [String], required: false },
        project: { type: String, required: true, default: "Inbox" },
        section: { type: String, required: false },
        // user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        // projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, },
    },
    { timestamps: true }
)

TaskSchema.statics.getParentTaskWithSubtasks = async function (parentId) {
    try {
        const parentTask = await this.findById(parentId).populate("subtasks")
        return parentTask
    } catch (error) {
        console.error("Error fetching parent task:", error)
        return null
    }
}

module.exports = mongoose.model("Task", TaskSchema)
