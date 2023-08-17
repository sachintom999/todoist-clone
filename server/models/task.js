const mongoose = require("mongoose")
const Schema = mongoose.Schema
const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        completed: { type: Boolean, required: true, default: false },
        dueDate: { type: Date, required: false, default: new Date() },
        subtasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        priority: { type: Number, required: true, default: 4 },
        labels: [{ type: Schema.Types.ObjectId, ref: "Label" }],
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            default: "64ddf2e5e0a81791d0336325", // change it later
        },
        section: { type: Schema.Types.ObjectId, ref: "Section" },
        user: { type: Schema.Types.ObjectId, ref: "TUser" },
        parentTask: { type: Schema.Types.ObjectId, ref: "Task" },
    },
    { timestamps: true }
)

TaskSchema.statics.getParentTaskWithSubtasks = async function (parentId) {
    try {
        const parentTask = await this.findById(parentId)
            .populate("subtasks")
            .populate("project")
            .populate("labels")
            .populate("section")
            // .populate("comments")
            .populate({
                path: "comments",
                populate: [
                    { path: "reactions.users", model: "TUser" },
                    {
                        path: "user",
                        model: "TUser",
                    },
                ],
            })
        return parentTask
    } catch (error) {
        console.error("Error fetching parent task:", error)
        return null
    }
}

module.exports = mongoose.model("Task", TaskSchema)
