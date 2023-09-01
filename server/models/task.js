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
        },
        section: { type: Schema.Types.ObjectId, ref: "Section" },
        user: { type: Schema.Types.ObjectId, ref: "TUser" },
        parentTask: { type: Schema.Types.ObjectId, ref: "Task", default: null },
        order: { type: Number, required: false },
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
            .populate("parentTask")
            .populate({
                path: "parentTask",
                populate: { path: "subtasks", model: "Task" },
            })
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

TaskSchema.statics.getTasksByFilterAndPopulate = async function (
    filters,
    populateList
) {
    try {
        const taskQuery = this.find(filters)

        populateList?.forEach(async item => {
            taskQuery.populate(item)
        })

        const tasks = await taskQuery.exec()

        return tasks
    } catch (error) {
        console.error(" task  error at line 56 ::", error)
        return null
    }
}

// TaskSchema.statics.getProjectTasksGroupedBySections = async function(projectId) {
//     try {
//         const tasks = await this.aggregate([
//             {
//                 $match: {
//                     project: new mongoose.Types.ObjectId(projectId),
//                     parentTask: null,
//                 },
//             },
//             {
//                 $lookup: {
//                     from: "sections",
//                     localField: "section",
//                     foreignField: "_id",
//                     as: "sectionInfo",
//                 },
//             },
//             {
//                 $unwind: {
//                     path: "$sectionInfo",
//                     preserveNullAndEmptyArrays: true,
//                 },
//             },
//             {
//                 $group: {
//                     _id: {
//                         sectionId: "$sectionInfo._id",
//                         sectionName: {
//                             $ifNull: ["$sectionInfo.name", "(No section)"],
//                         },
//                     },
//                     tasks: {
//                         $push: {
//                             _id: "$_id",
//                             title: "$title",
//                             desc: "$desc",
//                             dueDate: "$dueDate",
//                         },
//                     },
//                 },
//             },
//             {
//                 $sort: { "_id.sectionName": 1 },
//             },
//         ])

//         return tasks
//     } catch (err) {
//         console.error(err)
//         return null
//     }
// }

TaskSchema.statics.getProjectTasksGroupedBySections = async function (
    projectId
) {
    try {
        const tasks = await this.aggregate([
            {
                $match: {
                    project: new mongoose.Types.ObjectId(projectId),
                    parentTask: null,
                },
            },
            {
                $lookup: {
                    from: "sections",
                    localField: "section",
                    foreignField: "_id",
                    as: "sectionInfo",
                },
            },
            {
                $unwind: {
                    path: "$sectionInfo",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: {
                        sectionId: {
                            $ifNull: [
                                "$sectionInfo._id",
                                new mongoose.Types.ObjectId("999999999999"),
                            ],
                        },
                        sectionName: {
                            $ifNull: ["$sectionInfo.name", "(No section)"],
                        },
                    },
                    tasks: {
                        $push: {
                            _id: "$_id",
                            title: "$title",
                            desc: "$desc",
                            dueDate: "$dueDate",
                        },
                    },
                },
            },
            {
                $sort: { "_id.sectionName": 1 },
            },
        ])

        return tasks
    } catch (err) {
        console.error(err)
        return null
    }
}

module.exports = mongoose.model("Task", TaskSchema)
