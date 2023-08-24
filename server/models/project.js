const mongoose = require("mongoose")
const { generateUniqueSlug } = require("../helpers/slugify")

const Schema = mongoose.Schema

const projectSchema = new Schema(
    {
        name: { type: String, required: true },
        // slug: { type: String, unique: true },
        owner: { type: Schema.Types.ObjectId, ref: "TUser", required: true },
        sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
        tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
        color: { type: String, default: "#808080" },
        favourite: { type: Boolean, required: true, default: false },
        isInbox: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
)

projectSchema.statics.getDefaultProject = async function (ownerId) {
    return await this.findOne({ isInbox: true, owner: ownerId })
}

const Project = mongoose.model("Project", projectSchema)

// projectSchema.pre("save", async function (next) {
//     if (!this.isModified("name")) return next()
//     try {
//         const slug = generateUniqueSlug(this.name, Project) // Implement your slug generation logic
//         this.slug = slug
//         next()
//     } catch (error) {
//         return next(error)
//     }
// })


module.exports = Project
