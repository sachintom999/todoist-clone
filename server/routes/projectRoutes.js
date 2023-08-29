const express = require("express")
const {
    getAllProjects,
    getProjectTasks,
    getInboxTasks,
    createProject,
} = require("../controllers/projectController")

const router = express.Router()

router.get("/:projectId/tasks", getProjectTasks)
router.get("/inbox-tasks", getInboxTasks)
router.get("/", getAllProjects)
router.post("/", createProject)

module.exports = router
