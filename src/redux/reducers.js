import {
    fetchAllFavourites,
    fetchAllLabels,
    fetchAllProjects,
    fetchAllTasks,
    fetchTaskDetail,
    updateTask,
} from "./thunk"

export const reducers = {
    increment: state => {
        state.anyFormOpen = true
    },
    decrement: state => {
        state.anyFormOpen = false
    },
    reset: state => {
        state.noOfOpenForms = 0
    },

    updateNewTaskForm: (state, action) => {
        state.newTaskForm = action.payload
    },

    updatetaskDetailModalState: (state, action) => {
        // console.log("action.payload", action.payload)
        state.taskDetailModalState = {
            ...state.taskDetailModalState,
            ...action.payload,
        }

        // console.log("updated....")
        // console.log(state.taskDetailModalState)
    },

    openAddTaskForm: state => {
        state.addTaskFormOpen = true
    },
    closeAddTaskForm: state => {
        state.addTaskFormOpen = false
    },

    openTaskDetailForm: (state, action) => {
        state.taskDetailOpen = true
    },

    closeTaskDetailForm: state => {
        state.taskDetailOpen = false
    },

    createTask: (state, action) => {
        // console.log({ state, action })
        const { title, description } = action.payload
        axios
            .post("http://localhost:3000/api/tasks", {
                title,
                desc: description,
            })
            .then(res => {
                console.log("res.data", res.data)

                // state.tasks = [...state.tasks, res.data]
            })
    },

    completeTask: (state, action) => {
        const { id } = action.payload

        const url = `http://localhost:3000/api/tasks/${id}`

        axios
            .patch(url, {
                completed: true,
            })
            .then(res => {
                console.log("res", res)
                // state.taskList = [...state.taskList, res.data.task]
            })
            .catch(err => {
                console.log("err", err)
                console.log("Error:", err)
                console.log("Response Data:", err.response.data)
                console.log("Response Status:", err.response.status)
                console.log("Response Headers:", err.response.headers)
            })
    },

    getAllTasks: state => {
        axios.get(`http://localhost:3000/api/tasks`).then(res => {
            // console.log("res", res)
            // state.tasks = res.data
        })
    },

    getTodayTasks: (state, action) => {
        const allTasks = action.payload

        state.todaySections = []

        // const overDueTasks = []
        // const todayTasks = []

        const currentDate = new Date().toISOString().split("T")[0] // Get current date in YYYY-MM-DD format

        const todaysTasks = allTasks.filter(
            task =>
                !task.completed && task.dueDate?.split("T")[0] === currentDate
        )

        console.log("todaysTasks", todaysTasks)

        const overdueTasks = allTasks.filter(
            task => !task.completed && task.dueDate?.split("T")[0] < currentDate
        )

        if (overdueTasks.length > 0)
            state.todaySections = [
                ...state.todaySections,
                { name: "Overdue", tasks: overdueTasks },
            ]
        if (todaysTasks.length > 0)
            state.todaySections = [
                ...state.todaySections,
                { name: "Today", tasks: todaysTasks },
            ]

        // state.todaySections = [
        //     { name: "Overdue", tasks: overdueTasks, },

        //     {
        //         name: "Today",
        //         tasks: todaysTasks,
        //     },
        // ]
    },
}

export const extraReducers = builder => {
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.taskList = action.payload
    })
    builder.addCase(fetchAllProjects.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload)
        state.projects = action.payload
    })
    builder.addCase(fetchAllFavourites.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload)
        state.favourites = action.payload
    })
    builder.addCase(fetchAllLabels.fulfilled, (state, action) => {
        console.log("action.payload", action.payload)
        state.labels = action.payload
    })
    builder.addCase(fetchTaskDetail.fulfilled, (state, action) => {
        state.taskDetailModalContents = action.payload
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
        const { task } = action.payload
        state.taskDetailModalContents = {
            ...state.taskDetailModalContents,
            ...task,
        }
    })
}
