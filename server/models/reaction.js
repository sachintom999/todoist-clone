const ReactionSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        emoji: { type: String, required: true },
    },
    { timestamps: true }
)
