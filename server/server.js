require("dotenv").config()
const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose")
const taskRoutes = require("./routes/taskRoutes")

const app = express()
app.use(cors())

app.use(express.json())

// routes

app.use("/api/tasks", taskRoutes)

// app.get("/", (req, res) => {
// return res.json({ msg: "hello" })
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
