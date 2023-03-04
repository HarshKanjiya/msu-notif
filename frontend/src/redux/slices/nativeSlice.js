import { createSlice } from "@reduxjs/toolkit"
const nativeSlice = createSlice({
    name: "native",
    initialState: {
        nativeLoading: false,
        screen: "notif"

    },
    reducers: {
        changeScreen: (state, { payload }) => {
            state.screen = payload
        }
    },
})

export const { changeScreen } = nativeSlice.actions;

export default nativeSlice.reducer;
