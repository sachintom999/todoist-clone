const express = require("express")
const {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getSingleTask,
    reorderSubTasks,
    reorderSectionTasks,
    
    moveTask,
    searchTask,
} = require("../controllers/taskController")

const router = express.Router()

router.get("/search/:searchTerm", searchTask)
router.post("/moveTask", moveTask)
router.post("/:taskId/reorder-subtasks", reorderSubTasks)
router.post("/:sectionId/reorder-section-tasks", reorderSectionTasks)
router.get("/", getAllTasks)
router.get("/:id", getSingleTask)
router.post("/", createTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router
