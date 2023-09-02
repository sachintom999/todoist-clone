import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userSettings: {
            timeZone: "Asia/Kolkata",
        },
    },
    reducers: {
        increment: state => {
            state.count += 1
        },
    },
})

export const { increment } = userSlice.actions

export default userSlice.reducer
