const CommentSchema = new Schema(
    {
        text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        reactions: [
            {
                emoji: { type: String, required: true },
                users: [{ type: Schema.Types.ObjectId, ref: "User" }],
            },
        ],
    },
    { timestamps: true }
)
