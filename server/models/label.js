const mongoose = require("mongoose")
const Schema = mongoose.Schema

const labelSchema = new Schema(
    {
        name: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    },
    { timestamps: true }
)

const Label = mongoose.model("Label", labelSchema)

module.exports = Label
