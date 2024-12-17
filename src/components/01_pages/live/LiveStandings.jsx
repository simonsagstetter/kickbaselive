import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StandingPageSkeleton from "@/components/02_templates/Skeletons/StandingPageSkeleton";
import { useQuery } from "@tanstack/react-query";
import { API, Standing } from "@/api/http";
import LiveStandingLayout from "@/components/02_templates/LiveStandingLayout";
import { setStandings } from "@/store/live-slice";
import useDisable from "@/hooks/useDisable";
import { liveRefetchInterval } from "@/query/queryClient";

/**
 * Component representing the live standings page.
 * It fetches and displays the current standings for a given competition and matchday.
 * The component uses various hooks to manage state and side effects.
 *
 * @returns {JSX.Element} The content to be rendered, which can be a skeleton, live standings layout, or an outlet based on the current state.
 */
function LiveStandingsPage() {
    let content;
    const dispatch = useDispatch();
    const disable = useDisable();
    const { leagueId, matchId, teamId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const { competitionId } = useSelector((state) => state.league);
    const matchdayId = useSelector((state) => state.matchday.day);

    const { data: standing, isPending } = useQuery({
        queryKey: ["live", "standings", competitionId, matchdayId],
        queryFn: async ({ signal }) => {
            const standings = await API.setup({ signal, token }).fetch(Standing, { competitionId, matchdayId });
            await dispatch(setStandings(standings)).unwrap();
            return standings;
        },
        staleTime: 0,
        gcTime: 0,
        refetchInterval: liveRefetchInterval,
        refetchIntervalInBackground: false,
        throwOnError: (error) => {
            if (error?.status && error.status === 418) {
                disable(leagueId);
                return;
            }
        },
        enabled: !matchId && !teamId,
    });

    if (isPending) {
        content = <StandingPageSkeleton />;
    }

    if (standing) {
        content = <LiveStandingLayout />;
    }

    if (matchId && teamId) {
        content = <Outlet />;
    }

    return content;
}

export default LiveStandingsPage;
