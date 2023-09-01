require("dotenv").config()
const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose")
const taskRoutes = require("./routes/taskRoutes")
const authRoutes = require("./routes/authRoutes")
const commentRoutes = require("./routes/commentRoutes")
const projectRoutes = require("./routes/projectRoutes")
const favouriteRoutes = require("./routes/favouriteRoutes")
const sectionRoutes = require("./routes/sectionRoutes")
const labelRoutes = require("./routes/labelRoutes")
const { getTodayTasks, reorderSubTasks } = require("./controllers/taskController")
const { getTasksUnderLabel } = require("./controllers/labelController")
const {
    getProjectTasks,
    getProjectTasksGroupedBySections,
    getInboxTasks,
} = require("./controllers/projectController")

const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use("/api/tasks", taskRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/favourites", favouriteRoutes)
app.use("/api/labels", labelRoutes)
app.use("/api/sections", sectionRoutes)

app.get("/", (req, res) => {
    // console.log("req", req)
    // console.log("req.params", req.params)
    // console.log("req.body", req.body)
    return res.json({ msg: null })
})
// app.get("/today", getTodayTasks)
// app.get("/inbox", getInboxTasks)
// app.get("/project", getInboxTasks)
// app.get("/labels", getTasksUnderLabel)

const Project = require("./models/project")
app.get("/temp/:projectId", async (req, res) => {
    console.log("first..")
    const { projectId } = req.params

    console.log("projectId", projectId)

    const project = await Project.findById(projectId).populate({
        path: "sections",
        options: { sort: { order: 1 } },
        populate: {
            path: "tasks",
            options: { sort: { order: 1 } },
            model: "Task",
        },
    })

    console.log("project", project)
    return res.status(200).json(project)

    if (!project) {
        return res.status(404).json({ message: "no project found" })
    }
})
app.post("/temp", reorderSubTasks)

// app.post("/", (req, res) => {
//     return res.json({ msg: 123 })
// })

// DB


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                `connected to DB listening on ${process.env.PORT} !! 🟢`
            )
        })
    })
    .catch(err => {
        console.log("err", err)
    })
