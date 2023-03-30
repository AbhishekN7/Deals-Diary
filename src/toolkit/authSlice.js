import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("auth/login", async (credential, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/auth/login`, credential)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const googleLoginUser = createAsyncThunk("auth/google", async (credential, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/auth/google`, credential);
        console.log(data);
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_URL} / api / user / register`, userData)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const admingetAllusers = createAsyncThunk("admin/users", async (e, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/user/admin/users`)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState: { login: {}, users: [] },
    reducers: {
        logoutAction(state) {
            state.login = null
        }
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending, (state, { payload }) => {
            state.loginLoading = true
        }).addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loginLoading = false
            state.login = payload
        }).addCase(loginUser.rejected, (state, { payload }) => {
            state.loginLoading = false
            state.login = payload
        }).addCase(registerUser.pending, (state, { payload }) => {
            state.registerLoading = true
            state.registered = false
        }).addCase(registerUser.fulfilled, (state, { payload }) => {
            state.registerLoading = false
            state.registered = true
            state.login = payload
        }).addCase(registerUser.rejected, (state, { payload }) => {
            state.registerLoading = false
            state.registered = false
            state.error = payload

        }).addCase(admingetAllusers.fulfilled, (state, { payload }) => {
            state.adminusersLoading = false
            state.users = payload

        }).addCase(admingetAllusers.rejected, (state, { payload }) => {
            state.adminusersLoading = false
            state.error = payload

        }).addCase(admingetAllusers.pending, (state, { payload }) => {
            state.adminusersLoading = true

        }).addCase(googleLoginUser.pending, (state, { payload }) => {
            state.googleLoginUser = true
        }).addCase(googleLoginUser.fulfilled, (state, { payload }) => {
            state.googleLoginUser = false
            state.login = payload
        }).addCase(googleLoginUser.rejected, (state, { payload }) => {
            state.googleLoginUser = false
            state.error = payload
        })
    }
})

export default authSlice.reducer
export const { logoutAction } = authSlice.actions
