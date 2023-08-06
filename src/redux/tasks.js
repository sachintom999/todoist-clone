import { createSlice } from "@reduxjs/toolkit"

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        count: 0,
        addTaskFormOpen: false,
    },
    reducers: {
        increment: state => {
            state.count += 1
        },

        openAddTaskForm: state => {
            state.addTaskFormOpen = true
        },
        closeAddTaskForm: state => {
            state.addTaskFormOpen = false
        },
    },
})

export const { increment, openAddTaskForm, closeAddTaskForm } =
    tasksSlice.actions

export default tasksSlice.reducer
