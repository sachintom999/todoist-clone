const Comment = require("../models/comment")
const Task = require("../models/task")
const User = require("../models/user")
const mongoose = require("mongoose")

const addComment = async (req, res) => {
    console.log("6")
    const { taskId } = req.params

    const task = await Task.findById(taskId)
    if (!task) {
        return res.status(404).json({ error: "no such task" })
    }

    const { text } = req.body
    const comment = await Comment.create({
        text,
        user: "64de23b915bec7b2f5d601b2",
    })

    await Task.updateOne(
        { _id: task._id },
        { $push: { comments: comment._id } },
        { new: true }
    )

    await comment.populate("user")

    return res.status(200).json(comment)
}

const updateComment = async (req, res) => {
    const { id: commentId } = req.params
    console.log("req.body", req.body)

    if (["reaction"] in req.body) {
        console.log("✅ reaction!!! in req body here... new")

        try {
            const { id: commentId } = req.params
            const { emoji, userId } = req.body.reaction

            // Find the comment by ID
            const comment = await Comment.findById(commentId)

            if (!comment) {
                console.log("19")
                return res.status(404).json({ message: "Comment not found" })
            }

            // Find the index of the reaction with the given emoji
            const reactionIndex = comment.reactions.findIndex(
                reaction => reaction.emoji === emoji
            )

            if (reactionIndex !== -1) {
                const reaction = comment.reactions[reactionIndex]

                // Check if the user already reacted with the emoji
                const userIndex = reaction.users.indexOf(userId)
                if (userIndex !== -1) {
                    // Remove the user's reaction
                    reaction.users.splice(userIndex, 1)

                    // If no users are left with this reaction, remove the reaction itself
                    if (reaction.users.length === 0) {
                        comment.reactions.splice(reactionIndex, 1)
                    }
                } else {
                    // Add the user's reaction
                    reaction.users.push(userId)
                }
            } else {
                // Create a new reaction object
                comment.reactions.push({
                    emoji,
                    users: [userId],
                })
            }

            // Save the updated comment
            const updatedComment = await comment.save()

            console.log("updatedComment  🙋🏻‍♂️", updatedComment)

            res.status(200).json(updatedComment)
        } catch (error) {
            console.error("Error adding/removing reaction:", error)
            res.status(500).json({ message: "An error occurred" })
        }
    } else {
        console.log(" ❌reaction!!! in req body here...")

        // comment = await Task.findOneAndUpdate(
        //     { _id: id },
        //     // { ...req.body },
        //     { $set: { ...req.body } },
        //     { new: true }
        // )
    }
}

// const updateComment = async (req, res) => {
//     const { id: commentId } = req.params
//     console.log("req.body", req.body)

//     if (["reaction"] in req.body) {
//         console.log("✅ reaction!!! in req body here...")

//         // const { emoji } = req.body.reaction

//         try {
//             // const { commentId } = req.params;
//             const { emoji, userId } = req.body.reaction

//             // Find the comment by ID
//             const comment = await Comment.findById(commentId)

//             if (!comment) {
//                 return res.status(404).json({ message: "Comment not found" })
//             }

//             // Check if the comment already has a reaction with the given emoji
//             const existingReaction = comment.reactions.find(
//                 reaction => reaction.emoji === emoji
//             )

//             if (existingReaction) {
//                 // Update the existing reaction's "users" array
//                 existingReaction.users.push(userId)
//             } else {
//                 // Create a new reaction object
//                 comment.reactions.push({
//                     emoji,
//                     users: [userId],
//                 })
//             }

//             // Save the updated comment
//             const updatedComment = await comment.save()

//             console.log(" new comment -----", updatedComment)
//             res.status(200).json(updatedComment)
//         } catch (error) {
//             console.error("Error adding reaction:", error)
//             res.status(500).json({ message: "An error occurred" })
//         }
//     }

//     else {
//         console.log(" ❌reaction!!! in req body here...")

//         // comment = await Task.findOneAndUpdate(
//         //     { _id: id },
//         //     // { ...req.body },
//         //     { $set: { ...req.body } },
//         //     { new: true }
//         // )
//     }

// }

module.exports = { updateComment, addComment }
