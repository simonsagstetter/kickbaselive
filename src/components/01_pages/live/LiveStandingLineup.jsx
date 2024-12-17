import { useParams } from "react-router-dom";
import StandingLineupSkeleton from "@/components/02_templates/Skeletons/StandingLineupSkeleton";
import LiveStandingLineupLayout from "@/components/02_templates/LiveStandingLineupLayout";
import { useQuery } from "@tanstack/react-query";
import { API, StandingLineup } from "@/api/http";
import { useDispatch, useSelector } from "react-redux";
import { setStandingDetail } from "@/store/live-slice";
import useDisable from "@/hooks/useDisable";
import { liveRefetchInterval } from "@/query/queryClient";

/**
 * Component for displaying the live standing lineup page.
 * Utilizes various hooks and queries to fetch and display live standings data.
 */
function LiveStandingLineupPage() {
    let content;
    const dispatch = useDispatch();
    const disable = useDisable();
    const { leagueId, matchId, teamId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const matchdayId = useSelector((state) => state.matchday.day);
    const { season, competitionId } = useSelector((state) => state.league);

    const { data: standing, isPending } = useQuery({
        queryKey: ["live", "standings", competitionId, matchdayId, matchId, teamId],
        queryFn: async ({ signal }) => {
            const standingLineup = await API.setup({ signal, token }).fetch(StandingLineup, {
                season,
                matchId,
                competitionId,
                teamId,
                matchdayId,
                isLive: true,
            });
            await dispatch(setStandingDetail(standingLineup)).unwrap();
            return standingLineup;
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
    });

    if (isPending) {
        content = <StandingLineupSkeleton />;
    }

    if (standing) {
        content = <LiveStandingLineupLayout />;
    }
    return content;
}

export default LiveStandingLineupPage;
