// const faker = require("faker")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, default: "sachin" },
        lastName: { type: String, default: "sam" },
        image: { type: String, default: "https://picsum.photos/200" },
    },
    { timestamps: true }
)

const User = mongoose.model("TUser", UserSchema)

module.exports = User
