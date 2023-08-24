const express = require("express")
const {
    getAllProjects,
    getProjectTasks,
    getInboxTasks,
} = require("../controllers/projectController")

const router = express.Router()

router.get("/:projectId/tasks", getProjectTasks)
router.get("/inbox-tasks", getInboxTasks)
router.get("/", getAllProjects)

module.exports = router
