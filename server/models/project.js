const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        marks: {
            type: Number,
            min: 0,
            max: 100,
        },
        rooms: {
            type: [String],
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Project", ProjectSchema)
