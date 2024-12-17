import { configureStore } from "@reduxjs/toolkit";
import AuthRecuder from "../store/auth-slice";
import LeagueReducer from "../store/league-slice";
import MatchdayReducer from "../store/matchday-slice";
import LiveReducer from "../store/live-slice";

export const store = configureStore({
    reducer: {
        auth: AuthRecuder,
        league: LeagueReducer,
        matchday: MatchdayReducer,
        live: LiveReducer,
    },
});
