// const faker = require("faker")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        image: { type: String },
    },
    { timestamps: true }
)

const User = mongoose.model("TUser", UserSchema)

module.exports = User
