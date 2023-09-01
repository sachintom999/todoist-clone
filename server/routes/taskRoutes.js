const express = require("express")
const {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getSingleTask,
    reorderSubTasks,
} = require("../controllers/taskController")

const router = express.Router()

router.post("/:taskId/reorder-subtasks", reorderSubTasks)
router.get("/", getAllTasks)
router.get("/:id", getSingleTask)
router.post("/", createTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router



// '{"originalIndex":2, "newIndex":0}'