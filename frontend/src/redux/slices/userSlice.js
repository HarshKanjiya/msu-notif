import { createSlice } from "@reduxjs/toolkit"
import { assignTaskAPI } from "../../APIlinks";
import { loginThunk, logOutThunk, markAllThunk, markThunk, registerThunk, routineThunk } from "../thunk/userThunk";
const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isAuthenticated: undefined,
        userInfo: null,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        setUser: (state, { payload }) => {
            state.userInfo = payload
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

        builder.addCase(routineThunk.pending, (state, action) => {
        });
        builder.addCase(routineThunk.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.userInfo = null;
        });
        builder.addCase(routineThunk.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.error = action.payload;
            state.userInfo = null;
        });

        builder.addCase(markThunk.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(markThunk.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload;
        });
        builder.addCase(markThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload;
        });

        builder.addCase(markAllThunk.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(markAllThunk.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload;
        });
        builder.addCase(markAllThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload;
        });
    }
})

export const { clearErrors,setUser } =
    userSlice.actions;

export default userSlice.reducer;
