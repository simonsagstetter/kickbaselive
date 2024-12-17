import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, Matchtimes, Season, TeamAbbreviations } from "../api/http";

const storedLeague = JSON.parse(localStorage.getItem("league")) || {};

const initialState = {};

export const leagueSlice = createSlice({
    name: "league",
    initialState: {
        ...initialState,
        ...storedLeague,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setLeague.fulfilled, (state, action) => {
            return {
                ...action.payload,
            };
        });
        // eslint-disable-next-line no-unused-vars
        builder.addCase(removeLeague.fulfilled, (state) => {
            return {
                ...initialState,
            };
        });
        builder.addCase(updateLeague.fulfilled, (state, action) => {
            state.matchdayStartTime = action.payload.matchdayStartTime;
            state.matchdayEndTime = action.payload.matchdayEndTime;
            state.seasonEnd = action.payload.seasonEnd;
            state.currentDay = action.payload.currentDay;
        });
    },
});
export default leagueSlice.reducer;

export const leagueActions = leagueSlice.actions;

export const setLeague = createAsyncThunk("league/setLeague", async ({ league, token }, { rejectWithValue }) => {
    try {
        const { signal } = new AbortController();
        const api = API.setup({ signal, token });
        const { season: shortenedSeason, currentDay } = await api.fetch(Season, { leagueId: league.id });
        const season = shortenedSeason
            .split("/")
            .map((str) => `20${str}`)
            .join("/");

        const matchTimes = await api.fetch(Matchtimes, { competitionId: league.competitionId, currentDay });
        const abbreviations = await api.fetch(TeamAbbreviations, { competitionId: league.competitionId });
        const updatedLeague = {
            ...league,
            season,
            currentDay: matchTimes.matchDay,
            matchdayStartTime: matchTimes.startTime,
            matchdayEndTime: matchTimes.endTime,
            seasonEnd: matchTimes.seasonEnd,
            abbreviations,
        };
        localStorage.setItem("league", JSON.stringify(updatedLeague));
        return updatedLeague;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const updateLeague = createAsyncThunk(
    "league/updateLeague",
    async ({ leagueId, token, competitionId }, { rejectWithValue }) => {
        try {
            const { signal } = new AbortController();
            const api = API.setup({ signal, token });
            const { currentDay } = await api.fetch(Season, { leagueId });
            const matchTimes = await api.fetch(Matchtimes, { competitionId, currentDay });
            const localData = JSON.parse(localStorage.getItem("league"));
            localStorage.setItem(
                "league",
                JSON.stringify({
                    ...localData,
                    currentDay: matchTimes.matchDay,
                    matchdayStartTime: matchTimes.startTime,
                    matchdayEndTime: matchTimes.endTime,
                    seasonEnd: matchTimes.seasonEnd,
                })
            );
            return {
                currentDay: matchTimes.matchDay,
                matchdayStartTime: matchTimes.startTime,
                matchdayEndTime: matchTimes.endTime,
                seasonEnd: matchTimes.seasonEnd,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const removeLeague = createAsyncThunk("league/removeLeague", async () => {
    localStorage.setItem("league", JSON.stringify(initialState));
    return null;
});
