import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchAllTasks = createAsyncThunk(
    "tasks/fetchAllTasks",
    async () => {
        const response = await axios.get("http://localhost:3000/api/tasks")
        return response.data
    }
)
export const fetchAllFavourites = createAsyncThunk(
    "tasks/fetchAllFavourites",
    async () => {
        const response = await axios.get("http://localhost:3000/api/favourites")
        return response.data
    }
)

export const fetchAllProjects = createAsyncThunk(
    "tasks/fetchAllProjects",
    async () => {
        const response = await axios.get("http://localhost:3000/api/projects")
        return response.data
    }
)

export const fetchTaskDetail = createAsyncThunk(
    "tasks/fetchTaskDetail",
    async id => {
        const response = await axios.get(
            `http://localhost:3000/api/tasks/${id}`
        )
        return response.data
    }
)

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async payload => {
        const { id, ...reqBody } = payload
        console.log("reqBody", reqBody)
        const response = await axios.patch(
            `http://localhost:3000/api/tasks/${id}`,
            reqBody
        )

        return response.data
    }
)

export const updateComment = createAsyncThunk(
    "tasks/updateComment",
    async payload => {
        const { id, ...reqBody } = payload
        console.log("in updateComment --reqBody", reqBody)
        const response = await axios.patch(
            `http://localhost:3000/api/comments/${id}`,
            reqBody
        )

        return response.data
    }
)

// export const updateTask = createAsyncThunk(
//     "tasks/updateTask",
//     async ({ id, priority }) => {
//         const response = await axios.patch(
//             `http://localhost:3000/api/tasks/${id}`,

//             { priority }
//         )

//         return response.data
//     }
// )

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        count: 0,
        addTaskFormOpen: false,
        taskDetailOpen: false,
        anyFormOpen: false,
        taskList: [],
        todaySections: [],
        loading: false,
        projects: [],
        favourites: [],
        taskDetailModalContents: {},
        labelOptions: ["option-1", "option-2"],
        taskDetailModalState: {
            labels: [],
            sample: [1, 2, 3],
        },
        newTaskForm: {},
    },
    reducers: {
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
                    !task.completed &&
                    task.dueDate?.split("T")[0] === currentDate
            )

            console.log("todaysTasks", todaysTasks)

            const overdueTasks = allTasks.filter(
                task =>
                    !task.completed && task.dueDate?.split("T")[0] < currentDate
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
    },
    extraReducers: builder => {
        builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
            state.taskList = action.payload
        })
        builder.addCase(fetchAllProjects.fulfilled, (state, action) => {
            console.log("action.payload", action.payload)
            state.projects = action.payload
        })
        builder.addCase(fetchAllFavourites.fulfilled, (state, action) => {
            console.log("action.payload", action.payload)
            state.favourites = action.payload
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
    },
})

export const {
    increment,
    updatetaskDetailModalState,
    updateNewTaskForm,
    completeTask,
    filterTasks,
    getAllTasks,
    getTodayTasks,
    reset,
    decrement,
    openAddTaskForm,
    closeAddTaskForm,
    openTaskDetailForm,
    closeTaskDetailForm,
    createTask,
} = tasksSlice.actions

export default tasksSlice.reducer
