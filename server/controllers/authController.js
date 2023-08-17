// userController.js

const User = require("../models/user") // Import your User model
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check if user with the given email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
        })

        await newUser.save()
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    createUser,
}
