/**
 * authSlice.js
 * 
 * Purpose:
 * Handles authentication state with JWT. Manages the user's login status and 
 * token storage, and provides actions for login and logout.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../api/authApi';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    try {
        const response = await authApi.login(credentials);
        const { token, username } = response.data;
        localStorage.setItem('token', token); // Store the JWT in localStorage
        return { token, username };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
    try {
        const response = await authApi.register(userData);
        const { token, username } = response.data;
        localStorage.setItem('token', token); // Store the JWT in localStorage
        return { token, username };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token'); // Clear the JWT
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.username;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.username;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;