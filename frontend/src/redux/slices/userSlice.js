import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, logOutThunk, registerThunk } from "../thunk/userThunk";
const userSlice = createSlice({
    name: "user",
    initialState: {
        userLoading: false,
        isAuthenticated: false,
        userInfo: null,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {

        //log in thunk
        builder.addCase(loginThunk.pending, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.userInfo = action.payload;
        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.userInfo = null;
            state.error = action.payload;
        });

        //register thunk
        builder.addCase(registerThunk.pending, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        });
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.userInfo = action.payload;
        });
        builder.addCase(registerThunk.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.userInfo = null;
            state.error = action.payload;
        });

        //logout thunk
        builder.addCase(logOutThunk.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logOutThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.userInfo = null;
        });
        builder.addCase(logOutThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})