const express = require("express")
const {
    getAllProjects,
    getProjectTasks,
    getInboxTasks,
    createProject,
    getTodayTasks,
} = require("../controllers/projectController")

const router = express.Router()

router.get("/:projectId/tasks", getProjectTasks)
router.get("/inbox-tasks", getInboxTasks)
router.get("/today-tasks", getTodayTasks)
router.get("/", getAllProjects)
router.post("/", createProject)

module.exports = router
