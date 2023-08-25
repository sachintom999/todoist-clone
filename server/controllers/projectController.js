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

// const getProjectTasks = async (req, res) =>
//  {
//     console.log("15....")
//     const { projectId } = req.params
//     console.log('projectId', projectId)

//     Task.aggregate([
//         {
//             $match: {
//                 project: mongoose.Types.ObjectId(projectId),
//             },
//         },
//         {
//             $lookup: {
//                 from: "sections",
//                 localField: "section",
//                 foreignField: "_id",
//                 as: "sectionInfo",
//             },
//         },
//         {
//             $unwind: {
//                 path: "$sectionInfo",
//                 preserveNullAndEmptyArrays: true,
//             },
//         },
//         {
//             $group: {
//                 _id: {
//                     sectionId: "$sectionInfo._id",
//                     sectionName: {
//                         $ifNull: ["$sectionInfo.name", "No section"],
//                     },
//                 },
//                 tasks: {
//                     $push: {
//                         _id: "$_id",
//                         title: "$title",
//                         desc: "$desc",

//                     },
//                 },
//             },
//         },
//         {
//             $group: {
//                 _id: null,
//                 sections: {
//                     $push: {
//                         sectionId: "$_id.sectionId",
//                         sectionName: "$_id.sectionName",
//                         tasks: "$tasks",
//                     },
//                 },
//             },
//         },
//     ]

//     ).exec((err, result) => {
//         if (err) {
//             // Handle error
//             return res.status(500).json(err)
//         } else {
//             const sectionsWithTasks = result[0].sections
//             console.log(sectionsWithTasks)

//             return res.status(200).json(sectionsWithTasks)

//         }
//     })
// }

// const getProjectTasks = async (req, res) => {
//     console.log("15....");
//     const { projectId } = req.params;
//     console.log('projectId', projectId);

//     // const ObjectId = mongoose.Types.ObjectId;
//     const Schema = mongoose.Schema

//     try {
//         const result = await Task.aggregate([
//             {
//                 $match: {
//                     project: Schema.Types.ObjectId(projectId),
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
//                             $ifNull: ["$sectionInfo.name", "No section"],
//                         },
//                     },
//                     tasks: {
//                         $push: {
//                             _id: "$_id",
//                             title: "$title",
//                             desc: "$desc",
//                         },
//                     },
//                 },
//             },
//             {
//                 $group: {
//                     _id: null,
//                     sections: {
//                         $push: {
//                             sectionId: "$_id.sectionId",
//                             sectionName: "$_id.sectionName",
//                             tasks: "$tasks",
//                         },
//                     },
//                 },
//             },
//         ]);

//         const sectionsWithTasks = result[0].sections;
//         console.log(sectionsWithTasks);

//         return res.status(200).json(sectionsWithTasks);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

const getProjectTasks = async (req, res) => {
    console.log("/////",req.params)
    const { projectId } = req.params
    console.log('projectId', projectId)

    try {
        const tasks = await Task.getProjectTasksGroupedBySections(projectId)
        console.log('tasks🟢', tasks)

        return res.status(200).json(tasks)
    } catch (error) {
        console.error(" projectController  error at line 172 ::", error)
        return res.status(500).json(error)
    }
}
const getInboxTasks = async (req, res) => {
    console.log('169')
    

    const currentUser = await User.findOne({})
    const project = await Project.getDefaultProject(currentUser._id)


    console.log('project', project,project._id)

    try {
        const tasks = await Task.getProjectTasksGroupedBySections(project._id)
        return res.status(200).json(tasks)
    } catch (error) {
        console.error(" projectController  error at line 172 ::", error)
        return res.status(500).json(error)
    }
}

module.exports = { getAllProjects, getProjectTasks, getInboxTasks }
