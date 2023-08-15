import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchAllTasks = createAsyncThunk(
    "tasks/fetchAllTasks",
    async () => {
        const response = await axios.get("http://localhost:3000/api/tasks")
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
        taskDetailModalContents: {},
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
                    section: "Coding",
                })
                .then(res => {
                    state.tasks = [...state.tasks, res.data]
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
                    task.dueDate.split("T")[0] === currentDate
            )
            const overdueTasks = allTasks.filter(
                task =>
                    !task.completed && task.dueDate.split("T")[0] < currentDate
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
        builder.addCase(fetchTaskDetail.fulfilled, (state, action) => {
            state.taskDetailModalContents = action.payload
        })
    },
})

export const {
    increment,

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
