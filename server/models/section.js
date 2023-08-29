const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sectionSchema = new Schema(
    {
        name: { type: String, required: true },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
    },
    { timestamps: true }
)

const Section = mongoose.model("Section", sectionSchema)

module.exports = Section
