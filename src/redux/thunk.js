import { createAsyncThunk } from "@reduxjs/toolkit"
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

export const fetchAllLabels = createAsyncThunk(
    "tasks/fetchAllLabels",
    async () => {
        const response = await axios.get("http://localhost:3000/api/labels")
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
