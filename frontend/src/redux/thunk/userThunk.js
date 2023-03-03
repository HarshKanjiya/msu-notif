import { apiHeaderConfig, loginAPI, logOutAPI, registerAPI } from "../../APIlinks";

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
    'user/',
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
    'user/',
    async ({ }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(logOutAPI)
            console.log('log out', data);
            return data
        }
        catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)