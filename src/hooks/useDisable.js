import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { queryClient } from "@/query/queryClient";
import { removeLiveData } from "@/store/live-slice";
import { removeMatchday } from "@/store/matchday-slice";
import { updateLeague } from "@/store/league-slice";

/**
 * Custom hook to disable certain functionalities and navigate to a specific route.
 *
 * @returns {Function} disable - The function to disable live data and matchday, and navigate to a specific league's matchdays.
 */
function useDisable() {
    const token = useSelector((state) => state.auth.token);
    const competitionId = useSelector((state) => state.league.competitionId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Disables live data and matchday, removes related queries, and navigates to the matchdays page of a specific league.
     *
     * @param {string} leagueId - The ID of the league to navigate to.
     * @returns {Promise<void>} - A promise that resolves when the operations are complete.
     */
    async function disable(leagueId) {
        await dispatch(removeLiveData()).unwrap();
        queryClient.removeQueries({ queryKey: ["live"], exact: false });
        await dispatch(removeMatchday()).unwrap();
        queryClient.removeQueries({ queryKey: ["matchday"], exact: false });
        await dispatch(updateLeague({ leagueId, token, competitionId })).unwrap();
        startTransition(() => {
            navigate(`/leagues/${leagueId}/matchdays`);
        });
    }
    return disable;
}

export default useDisable;
