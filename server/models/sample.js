const mongoose = require("mongoose")
const Task = require("./task") // Import your Task model
const dbURI =
    "mongodb+srv://admin:7ha1bl5ZewQWPZ57@mernapp.gq1hbph.mongodb.net/?retryWrites=true&w=majority" // Replace with your MongoDB connection string

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const insertSampleData = async () => {
    try {
        const parentTask = await Task.create({
            title: "Parent Task",
            desc: "Description for Parent Task",
            dueDate: new Date(),
            subtasks: [],
        })

        const subtask1 = await Task.create({
            title: "Subtask 1",
            desc: "Description for Subtask 1",
            dueDate: new Date(),
        })

        const subtask2 = await Task.create({
            title: "Subtask 2",
            desc: "Description for Subtask 2",
            dueDate: new Date(),
        })

        parentTask.subtasks.push(subtask1, subtask2)
        await parentTask.save()

        console.log("Sample data inserted successfully.")
    } catch (error) {
        console.error("Error inserting sample data:", error)
    } finally {
        mongoose.disconnect()
    }
}

insertSampleData()
