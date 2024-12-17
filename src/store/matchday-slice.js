import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedMatchday = JSON.parse(localStorage.getItem("matchday")) || {};

const initialState = {};

export const matchdaySlice = createSlice({
    name: "matchday",
    initialState: {
        ...initialState,
        ...storedMatchday,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setMatchday.fulfilled, (state, action) => {
            return {
                ...action.payload,
            };
        }),
            // eslint-disable-next-line no-unused-vars
            builder.addCase(removeMatchday.fulfilled, (state) => {
                return {
                    ...initialState,
                };
            });
    },
});
export default matchdaySlice.reducer;

export const matchdayActions = matchdaySlice.actions;

export const setMatchday = createAsyncThunk("matchday/setMatchday", async (matchday, { rejectWithValue }) => {
    try {
        localStorage.setItem("matchday", JSON.stringify(matchday));
        return matchday;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const removeMatchday = createAsyncThunk("matchday/removeMatchday", async () => {
    localStorage.setItem("matchday", JSON.stringify(initialState));
    return null;
});
