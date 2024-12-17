import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    managerDetail: {},
    managers: [],
    standings: [],
    standingDetail: {
        standing: {},
        players: [],
    },
    top: [],
};

export const liveSlice = createSlice({
    name: "live",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setManagers.fulfilled, (state, action) => {
            state.managers = action.payload;
        });

        builder.addCase(setManagerDetail.fulfilled, (state, action) => {
            state.managerDetail = action.payload;
        });

        builder.addCase(setStandings.fulfilled, (state, action) => {
            state.standings = action.payload;
        });

        builder.addCase(setStandingDetail.fulfilled, (state, action) => {
            state.standingDetail = action.payload;
        });

        builder.addCase(setTopPlayers.fulfilled, (state, action) => {
            state.top = action.payload;
        });

        // eslint-disable-next-line no-unused-vars
        builder.addCase(removeLiveData.fulfilled, (state, action) => {
            return {
                ...initialState,
            };
        });
    },
});

export default liveSlice.reducer;

export const liveActions = liveSlice.actions;

export const setManagers = createAsyncThunk("live/setManagers", async (managers) => managers);

export const setManagerDetail = createAsyncThunk("live/setManagerDetail", async (managerDetail) => managerDetail);

export const setStandings = createAsyncThunk("live/setStandings", async (standings) => standings);

export const setStandingDetail = createAsyncThunk("live/setStandingDetail", async (standingDetail) => standingDetail);

export const setTopPlayers = createAsyncThunk("live/setTopPlayers", async (players) => players);

export const removeLiveData = createAsyncThunk("live/removeLiveData", async () => {});
