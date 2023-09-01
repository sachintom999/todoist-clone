const mongoose = require("mongoose")
const User = require("./user")
const Label = require("./label")
const Section = require("./section")
const Task = require("./task")
const Project = require("./project")
const Comment = require("./comment")

const path = require("path")
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
        // Insert Users
        const user = await User.create({
            email: "john@example.com",
            firstName: "John",
            lastName: "Doe",
            image: "https://example.com/john.jpg",
        })

        // Insert Labels
        const wipLabel = await Label.create({
            name: "wip",
            user: user._id,
            color: "#ff9900",
            favourite: true,
        })

        const homeLabel = await Label.create({
            name: "Home",
            user: user._id,
            color: "#3366cc",
        })

        // Insert Projects
        const workProject = await Project.create({
            name: "Work Project",
            owner: user._id,
            color: "#11c023",
            sections: [],
            favourite: true,
            isInbox: false,
        })

        const homeProject = await Project.create({
            name: "Home Project",
            owner: user._id,
            color: "#ff6666",
            sections: [],
            favourite: true,
            isInbox: false,
        })

        // Insert Sections
        const codingSection = await Section.create({
            name: "Coding",
            project: workProject._id,
            order: 1,
            tasks: [], // Initialize tasks array
        })
        const reviewSection = await Section.create({
            name: "Review",
            project: workProject._id,
            order: 2,
            tasks: [], // Initialize tasks array
        })

        const shoppingSection = await Section.create({
            name: "Shopping",
            project: homeProject._id,
            order: 1,
            tasks: [], // Initialize tasks array
        })

        workProject.sections.push(codingSection._id)
        workProject.sections.push(reviewSection._id)
        homeProject.sections.push(shoppingSection._id)

        await workProject.save()
        await homeProject.save()

        // Insert Tasks
        const codingTask = await Task.create({
            title: "Complete Feature",
            desc: "Finish implementing the new feature.",
            completed: false,
            dueDate: new Date("2023-09-10"),
            subtasks: [],
            comments: [],
            priority: 3,
            labels: [wipLabel._id],
            project: workProject._id,
            section: codingSection._id,
            user: user._id,
            parentTask: null,
            order: 1,
        })
        const reviewPRTask = await Task.create({
            title: "Review PR",
            desc: "review all the PR in the github",
            completed: false,
            dueDate: new Date("2023-09-19"),
            subtasks: [],
            comments: [],
            priority: 3,
            labels: [wipLabel._id],
            project: workProject._id,
            section: reviewSection._id,
            user: user._id,
            parentTask: null,
            order: 2,
        })
        const reviewPRTask_subtask1 = await Task.create({
            title: "PR 1",
            desc: "....",
            completed: false,
            dueDate: new Date("2023-09-19"),
            subtasks: [],
            comments: [],
            priority: 3,
            user: user._id,
            parentTask: reviewPRTask._id,
            order: 1,
        })
        const reviewPRTask_subtask2 = await Task.create({
            title: "PR 2",
            desc: "....",
            completed: false,
            dueDate: new Date("2023-09-19"),
            subtasks: [],
            comments: [],
            priority: 3,

            user: user._id,
            parentTask: reviewPRTask._id,
            order: 2,
        })
        const reviewPRTask_subtask3 = await Task.create({
            title: "PR 3",
            desc: "....",
            completed: false,
            dueDate: new Date("2023-09-19"),
            subtasks: [],
            comments: [],
            priority: 3,

            user: user._id,
            parentTask: reviewPRTask._id,
            order: 3,
        })

        reviewPRTask.subtasks.push(
            reviewPRTask_subtask1._id,
            reviewPRTask_subtask2._id,
            reviewPRTask_subtask3._id
        )
        await reviewPRTask.save()

        const shoppingTask = await Task.create({
            title: "Grocery Shopping",
            desc: "Buy groceries for the week.",
            completed: false,
            dueDate: new Date("2023-09-12"),
            subtasks: [],
            comments: [],
            priority: 2,
            labels: [homeLabel._id],
            project: homeProject._id,
            section: shoppingSection._id,
            user: user._id,
            parentTask: null,
            order: 1,
        })

        // Update Section and Label tasks arrays
        codingSection.tasks.push(codingTask._id)
        reviewSection.tasks.push(reviewPRTask._id)
        await reviewSection.save()
        await codingSection.save()

        shoppingSection.tasks.push(shoppingTask._id)
        await shoppingSection.save()

        // Update Label tasks array
        wipLabel.tasks.push(codingTask._id)
        await wipLabel.save()

        homeLabel.tasks.push(shoppingTask._id)
        await homeLabel.save()

        const comment = await Comment.create({
            text: "This is amazing....",
            user: user._id,
            task: codingTask._id, // Assign the comment to the Todoist Clone task
            reactions: [
                {
                    emoji: "👍",
                    users: [user._id],
                },
                {
                    emoji: "❤️",
                    users: [user._id],
                },
            ],
        })
        const comment1 = await Comment.create({
            text: "great..",
            user: user._id,
            task: codingTask._id, // Assign the comment to the Todoist Clone task
            reactions: [
                {
                    emoji: "⭐️",
                    users: [user._id],
                },
                {
                    emoji: "🙋🏻‍♂️",
                    users: [user._id],
                },
            ],
        })

        codingTask.comments.push(comment._id, comment1._id)
        await codingTask.save()

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
