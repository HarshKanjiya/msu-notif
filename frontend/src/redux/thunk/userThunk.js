import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminGetUsersAPI, apiHeaderConfig, assignTaskAPI, loginAPI, logOutAPI, markAllAPI, markAPI, registerAPI, routineAPI } from "../../APIlinks";
import axios from "axios"
import { setUser } from "../slices/userSlice";

export const loginThunk = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(loginAPI, { email, password }, apiHeaderConfig)
            console.log('log in', data);
            return data.user
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
            const { data } = await axios.post(registerAPI, { name, email, password }, apiHeaderConfig)
            console.log('register', data);
            return data.user
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

export const adminGetUsersThunk = createAsyncThunk(
    'admin/getUsers',
    async ({ }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(adminGetUsersAPI)
            return data.users
        }
        catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

export const AssignTaskThunk = createAsyncThunk(
    'admin/AssignTask',
    async ({ userIDs, subject, message, userID }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post(assignTaskAPI, { userIDs, subject, message, userID }, apiHeaderConfig)
            dispatch(setUser(data.user))
            return data.users
        }
        catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)


export const markThunk = createAsyncThunk(
    'user/mark',
    async ({ subject, message, userID, seen, notifID }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(markAPI, { notifID, subject, message, userID, seen }, apiHeaderConfig)
            console.log('hi Harxh!!!', data);
            return data.user
        }
        catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)
export const markAllThunk = createAsyncThunk(
    'user/markall',
    async ({ userID, seen }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(markAllAPI, { userID, seen }, apiHeaderConfig)
            return data.user
        }
        catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)
