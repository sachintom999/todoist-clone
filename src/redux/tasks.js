import { createSlice } from "@reduxjs/toolkit"

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        count: 0,
    },
    reducers: {
        increment: state => {
            state.count += 1
        },
    },
})

export const { increment } = tasksSlice.actions

export default tasksSlice.reducer
