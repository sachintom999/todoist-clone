const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema(
    {
        text: { type: String, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            default: "64de23b915bec7b2f5d601b2",
        },
        reactions: [
            {
                emoji: { type: String, required: true },
                users: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                        default: "64de23b915bec7b2f5d601b2",
                    },
                ],
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Comment", CommentSchema)
