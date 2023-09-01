import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { replaceKeys, replaceKeys1 } from "../config/helpers"

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
        appState: {
            online: navigator.onLine,
            loading: true,
        },

        newTaskSettings: {
            project: null,
            section: null,
            parentTask: null,
            tags: [],
            dueDate: null,
            priority: null,
        },

        labelTasks: {},

        deleteConfirmationModal: {
            show: false,
            data: {},
        },
        addProjectModal: {
            show: false,
            data: {},
        },
        cornerModal: {
            show: false,
            data: {},
        },
        addTaskModal: {
            show: false,
            data: {},
        },
        createEditLabelModal: {
            show: false,
            data: {},
        },

        pageTasks: [],

        count: 0,
        addTaskFormOpen: false,
        taskDetailOpen: false,
        anyFormOpen: false,
        taskList: [],
        todaySections: [],
        loading: false,
        projects: [],
        favourites: [],
        labels: [],
        taskDetailModalContents: {},
        labelOptions: ["option-1", "option-2"],
        taskDetailModalState: {
            labels: [],
            sample: [1, 2, 3],
        },
        newTaskForm: {
            context: "", // global , section , subtask
        },
        user: null,
    },
    reducers: {
        updateappState: (state, action) => {},

        updatedeleteConfirmationModal: (state, action) => {
            console.log("49 ", action.payload)
            state.deleteConfirmationModal = action.payload
        },
        updateaddProjectModal: (state, action) => {
            state.addProjectModal = action.payload
        },

        updateNewTaskForm: (state, action) => {
            state.newTaskForm = action.payload
        },

        updateaddTaskModal: (state, action) => {
            state.addTaskModal = action.payload
        },

        updatetaskDetailModalState: (state, action) => {
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
        deleteTask: (state, action) => {
            // console.log("action.payload", action.payload)
            const { taskId } = action.payload

            axios
                .delete(`http://localhost:3000/api/tasks/${taskId}`)
                .then(res => {
                    console.log("res.data  deleted..", res.data)

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

        updatecreateEditLabelModal: (state, action) => {
            state.createEditLabelModal = action.payload
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
            state.appState.loading = false
        })
        builder.addCase(reorderSubtasks.fulfilled, (state, action) => {
            // state.taskDetailModalContents
        })
        builder.addCase(fetchLabelTasks.fulfilled, (state, action) => {
            state.labelTasks = action.payload
        })
        builder.addCase(getProjectTasks.fulfilled, (state, action) => {
            // console.log(" getProjectTasks >> action.payload", action.payload)

            const transformedData = replaceKeys(action.payload)

            // console.log('transformedData', transformedData)

            state.pageTasks = replaceKeys(action.payload)
        })
        builder.addCase(getInboxTasks.fulfilled, (state, action) => {
            state.pageTasks = action.payload
        })
        builder.addCase(getAllLabels.fulfilled, (state, action) => {
            state.labels = action.payload
        })
        builder.addCase(fetchAllProjects.fulfilled, (state, action) => {
            // console.log("action.payload", action.payload)
            state.projects = action.payload
        })
        builder.addCase(fetchAllFavourites.fulfilled, (state, action) => {
            // console.log("action.payload", action.payload)
            state.favourites = action.payload
        })
        builder.addCase(fetchTaskDetail.fulfilled, (state, action) => {
            state.taskDetailModalContents = action.payload
        })

        builder.addCase(createComment.fulfilled, (state, action) => {
            state.taskDetailModalContents.comments.push(action.payload)
        })

        builder.addCase(updateTask.fulfilled, (state, action) => {
            // console.log("action.payload", action.payload)
            // state.taskDetailModalContents = action.payload
        })

        // builder.addCase(updateTask.fulfilled, (state, action) => {
        //     const { task } = action.payload
        //     state.taskDetailModalContents = {
        //         ...state.taskDetailModalContents,
        //         ...task,
        //     }
        // })
    },
})

export const fetchAllTasks = createAsyncThunk(
    "tasks/fetchAllTasks",
    async () => {
        const response = await axios.get("http://localhost:3000/api/tasks")
        return response.data
    }
)

export const getProjectTasks = createAsyncThunk(
    "tasks/getProjectTasks",
    async id => {
        const response = await axios.get(`http://localhost:3000/temp/${id}`)
        console.log("297", response.data)

        const sectionTasks = response.data.sections
        const updatedData = replaceKeys1(sectionTasks)
        console.log("updatedData", updatedData)

        return response.data
    }
)
export const getInboxTasks = createAsyncThunk(
    "tasks/getInboxTasks",
    async () => {
        const response = await axios.get(
            `http://localhost:3000/api/projects/inbox-tasks`
        )

        console.log("response.data", response.data)
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
export const getAllLabels = createAsyncThunk("tasks/getAllLabels", async () => {
    const response = await axios.get("http://localhost:3000/api/labels")
    return response.data
})

export const reorderSubtasks = createAsyncThunk(
    "tasks/reorderSubtasks",
    async payload => {
        const { taskId, ...reqBody } = payload

        const response = await axios.post(
            `http://localhost:3000/api/tasks/${taskId}/reorder-subtasks`,
            reqBody
        )

        console.log("response.data 🟠", response.data)
        return response.data
    }
)

export const reorderSectionTasks = createAsyncThunk(
    "tasks/reorderSectionTasks",
    async payload => {
        console.log("341...payload", payload)
        const { sectionId, ...reqBody } = payload

        const response = await axios.post(
            `http://localhost:3000/api/tasks/${sectionId}/reorder-section-tasks`,
            reqBody
        )

        return response.data
    }
)

export const moveTask = createAsyncThunk("tasks/moveTask", async payload => {
    const response = await axios.post(
        `http://localhost:3000/api/tasks/moveTask`,
        payload
    )
    console.log('reponse.data', reponse.data)

    return response.data
})

export const fetchLabelTasks = createAsyncThunk(
    "tasks/fetchLabelTasks",
    async labelId => {
        const response = await axios.get(
            `http://localhost:3000/api/labels/${labelId}/tasks`
        )
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
        console.log("response.data", response.data)

        return response.data
    }
)
export const createComment = createAsyncThunk(
    "tasks/createComment",
    async payload => {
        const { taskId, ...reqBody } = payload
        console.log("in createComment --reqBody", reqBody)
        const response = await axios.post(
            `http://localhost:3000/api/comments/create/${taskId}`,
            reqBody
        )

        console.log("response.data", response.data)

        return response.data
    }
)
export const createProject = createAsyncThunk(
    "tasks/createProject",
    async payload => {
        console.log("payload", payload)

        const response = await axios.post(
            `http://localhost:3000/api/projects`,
            payload
        )

        console.log("response.data", response.data)

        return response.data
    }
)

//  dispatch ( createComment( {taskId:"",text:"" }  ))

export const {
    increment,
    deleteTask,
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
    updatedeleteConfirmationModal,
    updatecreateEditLabelModal,
    updateaddTaskModal,
    updateappState,
    updateaddProjectModal,
} = tasksSlice.actions

export default tasksSlice.reducer
