import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiHeaderConfig, loginAPI, logOutAPI, registerAPI, routineAPI } from "../../APIlinks";
import axios from "axios"

export const loginThunk = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(loginAPI, { email, password }, apiHeaderConfig)
            console.log('log in', data);
            return data
        }
        catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

export const registerThunk = createAsyncThunk(
    'user/register',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(registerAPI, { email, password }, apiHeaderConfig)
            console.log('register', data);
            return data
        }
        catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

export const logOutThunk = createAsyncThunk(
    'user/logout',
    async ({ }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(logOutAPI)
            console.log('log out', data);
            return data
        }
        catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

export const routineThunk = createAsyncThunk(
    'user/routine',
    async ({ }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(routineAPI)
            return data
        }
        catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)