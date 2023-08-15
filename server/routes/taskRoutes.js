const express = require("express")
const {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getSingleTask,
} = require("../controllers/taskController")

const router = express.Router()

router.get("/", getAllTasks)
router.get("/:id", getSingleTask)
router.post("/", createTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router
