const Comment = require("../models/comment")
const mongoose = require("mongoose")

const updateComment = async (req, res) => {
    const { id } = req.params
    console.log("req.body", req.body)

    let comment

    if (["reaction"] in req.body) {
        console.log("✅ reaction!!! in req body here...")

        const { emoji } = req.body.reaction

        // comment = await Comment.findOneAndUpdate(
        //     { _id: id },
        //     {
        //         $push: {
        //             reactions: { emoji, users: [] },

        //         },
        //     }, // Add subtask ID to the subtasks array
        //     { new: true }
        // )

        comment = await Comment.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    reactions: {
                        $cond: {
                            if: { $in: [emoji, "$reactions.emoji"] }, // Check if emoji already exists
                            then: {
                                $each: [],
                                $position: 0,
                            },
                            else: {
                                emoji,
                                users: ["64de23b915bec7b2f5d601b2"], // Replace "userObjectId" with the actual user ObjectId
                            },
                        },
                    },
                },
            },
            { new: true }
        )

        console.log(" new comment -----", comment)
    } else {
        console.log(" ❌reaction!!! in req body here...")

        // comment = await Task.findOneAndUpdate(
        //     { _id: id },
        //     // { ...req.body },
        //     { $set: { ...req.body } },
        //     { new: true }
        // )
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such comment" })
    }

    // if (!comment) {
    //     return res.status(404).json({ error: "no such comment" })
    // }

    return res.status(200).json({ comment })
}

module.exports = { updateComment }
