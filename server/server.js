require("dotenv").config()
const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose")
const taskRoutes = require("./routes/taskRoutes")
const authRoutes = require("./routes/authRoutes")
const commentRoutes = require("./routes/commentRoutes")
const projectRoutes = require("./routes/projectRoutes")
const favouriteRoutes = require("./routes/favouriteRoutes")

const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use("/api/tasks", taskRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/favourites", favouriteRoutes)

app.get("/", (req, res) => {
    return res.json({ msg: null })
})
app.post("/", (req, res) => {
    return res.json({ msg: 123 })
})

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
