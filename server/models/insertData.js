const mongoose = require("mongoose")
const User = require("./user")
const Label = require("./label")
const Section = require("./section")
const Task = require("./task")
const Project = require("./project")
const Comment = require("./comment")

// const faker = require("faker")

const path = require("path")
const { pl } = require("date-fns/locale")
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

mongoose.connect(process.env.MONGO_URI)

async function deleteData() {
    try {
        await User.deleteMany({})
        await Label.deleteMany({})
        await Section.deleteMany({})
        await Project.deleteMany({})
        await Task.deleteMany({})
        await Comment.deleteMany({})
        console.log("Data deleted successfully.")
    } catch (error) {
        console.error("Error deleting data:", error)
    }
}

async function insertSampleData() {
    try {
        // Insert User
        const user = await User.create({
            email: "sam@example.com",
        })
        const user2 = await User.create({
            email: "tim@example.com",
        })

        // Insert Labels
        const wipLabel = await Label.create({
            name: "WIP",
            user: user._id,
        })

        // Insert Projects
        const inboxProject = await Project.create({
            name: "Inbox",
            owner: user._id,
            color: "#000000",
            sections: [],
        })

        const workProject = await Project.create({
            name: "Work",
            owner: user._id,
            color: "#ffffff",
            sections: [],
        })

        // Insert Sections
        const healthSection = await Section.create({
            name: "Health",
            project: inboxProject._id,
        })

        const financeSection = await Section.create({
            name: "Finance",
            project: inboxProject._id,
        })

        const codingSection = await Section.create({
            name: "Coding",
            project: workProject._id,
        })

        const marketingSection = await Section.create({
            name: "Marketing",
            project: workProject._id,
        })

        // Update Project sections
        inboxProject.sections.push(healthSection._id, financeSection._id)
        await inboxProject.save()

        workProject.sections.push(codingSection._id, marketingSection._id)
        await workProject.save()

        // Insert Task and Subtasks
        const todoistCloneTask = await Task.create({
            title: "Todoist Clone",
            desc: "Clone the Todoist app",
            project: workProject._id,
            section: codingSection._id, // Assign to "Coding" section
            subtasks: [],
            user: user._id, // Assign the user
            dueDate: new Date(),
        })

        const frontendSubtask = await Task.create({
            title: "Frontend",
            desc: "Develop frontend components",
            project: workProject._id,
            section: codingSection._id,
            parent_task: todoistCloneTask._id, // Assign parent task
            user: user._id, // Assign the user
            parentTask: todoistCloneTask._id,
        })

        const backendSubtask = await Task.create({
            title: "Backend",
            desc: "Develop backend logic",
            project: workProject._id,
            section: codingSection._id,
            labels: [wipLabel._id], // Assign label "WIP"
            parent_task: todoistCloneTask._id, // Assign parent task
            user: user._id, // Assign the user
            completed: true,
            parentTask: todoistCloneTask._id,
        })

        const comment = await Comment.create({
            text: "This is amazing....",
            user: user._id,
            task: todoistCloneTask._id, // Assign the comment to the Todoist Clone task
            reactions: [
                {
                    emoji: "👍",
                    users: [user._id],
                },
                {
                    emoji: "❤️",
                    users: [user2._id],
                },
            ],
        })
        const comment1 = await Comment.create({
            text: "great..",
            user: user2._id,
            task: todoistCloneTask._id, // Assign the comment to the Todoist Clone task
            reactions: [
                {
                    emoji: "⭐️",
                    users: [user._id],
                },
                {
                    emoji: "🙋🏻‍♂️",
                    users: [user2._id],
                },
            ],
        })

        todoistCloneTask.subtasks.push(frontendSubtask._id, backendSubtask._id)
        todoistCloneTask.comments.push(comment._id, comment1._id)

        await todoistCloneTask.save()

        console.log("Sample data inserted successfully.")
    } catch (error) {
        console.error("Error inserting sample data:", error)
    } finally {
        mongoose.disconnect()
    }
}

// console.log("166")
deleteData().then(() => {
    // After deleting data, insert sample data
    insertSampleData()
})
