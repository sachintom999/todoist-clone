const mongoose = require("mongoose")
const Schema = mongoose.Schema

const projectSchema = new Schema(
    {
        name: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: "TUser", required: true },
        sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
        tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
        color: { type: String },
        favourite: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
)

const Project = mongoose.model("Project", projectSchema)

module.exports = Project
