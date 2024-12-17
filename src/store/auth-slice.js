import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const storedAuthentication = JSON.parse(localStorage.getItem("auth")) || {};

const initialState = {
    token: undefined,
    tokenExp: undefined,
    user: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        ...initialState,
        ...storedAuthentication,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            return {
                ...action.payload,
            };
        }),
            // eslint-disable-next-line no-unused-vars
            builder.addCase(logout.fulfilled, (state) => {
                return {
                    ...initialState,
                };
            });
    },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;

export const login = createAsyncThunk("auth/login", async ({ tkn, tknex, u }) => {
    const auth = {
        token: tkn,
        tokenExp: tknex,
        user: u,
    };
    localStorage.setItem("auth", JSON.stringify(auth));

    return auth;
});

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.clear();
    return null;
});
