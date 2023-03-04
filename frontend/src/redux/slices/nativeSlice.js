import { createSlice } from "@reduxjs/toolkit"
import { adminGetUsersThunk, AssignTaskThunk } from "../thunk/userThunk";
const nativeSlice = createSlice({
    name: "native",
    initialState: {
        nativeLoading: false,
        screen: "notif",
        users: [],
        error: null,
        msg: null

    },
    reducers: {
        changeScreen: (state, { payload }) => {
            state.screen = payload
        },
        clearNativeErr: (state) => {
            state.error = null
        },
        clearMsg: (state) => {
            state.msg = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminGetUsersThunk.pending, (state, action) => {
        });
        builder.addCase(adminGetUsersThunk.fulfilled, (state, action) => {
            state.users = action.payload
        });
        builder.addCase(adminGetUsersThunk.rejected, (state, action) => {
            state.error = action.payload;
        });

        builder.addCase(AssignTaskThunk.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(AssignTaskThunk.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.msg = "Wrok Notification Sent!"
        });
        builder.addCase(AssignTaskThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        });
    }
})

export const { changeScreen, clearNativeErr,clearMsg } = nativeSlice.actions;

export default nativeSlice.reducer;
