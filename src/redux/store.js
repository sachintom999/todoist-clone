import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./tasks"
import userReducer from "./user"

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        user: userReducer,
    },
})
