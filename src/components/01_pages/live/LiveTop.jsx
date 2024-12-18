import { useParams } from "react-router-dom";
import TopPageSkeleton from "@/components/02_templates/Skeletons/TopPageSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { API, LiveTop25 } from "@/api/http";
import { setTopPlayers } from "@/store/live-slice";
import LiveTopLayout from "@/components/02_templates/LiveTopLayout";
import { liveRefetchInterval } from "@/query/queryClient";

/**
 * Component that displays the live top players page.
 * Utilizes hooks to fetch and display data related to top players in a league.
 * Handles loading states and errors during data fetching.
 *
 * @returns {JSX.Element} The content to be rendered, either a loading skeleton or the live top layout.
 */
function LiveTopPage() {
    let content;
    const dispatch = useDispatch();
    const { leagueId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const matchdayId = useSelector((state) => state.matchday.day);
    const { season, competitionId } = useSelector((state) => state.league);

    const { data: players, isPending } = useQuery({
        queryKey: ["live", "top", competitionId, matchdayId],
        queryFn: async ({ signal }) => {
            const players = await API.setup({ signal, token }).fetch(LiveTop25, {
                season,
                competitionId,
                leagueId,
                matchdayId,
            });
            await dispatch(setTopPlayers(players)).unwrap();
            return players;
        },
        staleTime: 0,
        gcTime: 0,
        refetchInterval: liveRefetchInterval,
        refetchIntervalInBackground: false,
        throwOnError: true,
    });

    if (isPending) {
        content = <TopPageSkeleton />;
    }

    if (players) {
        content = <LiveTopLayout />;
    }

    return content;
}

export default LiveTopPage;
