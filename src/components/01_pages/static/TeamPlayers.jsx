import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { queryClient } from "@/query/queryClient";
import { useQueries } from "@tanstack/react-query";
import { API, TeamPlayers, Teams } from "@/api/http";
import TeamPlayersSkeleton from "@/components/02_templates/Skeletons/TeamPlayersSkeleton";
import TeamPlayersLayout from "@/components/02_templates/TeamPlayersLayout";

/**
 * TeamPlayersPage component fetches and displays team and player data.
 *
 * @param {Object} props - The component props.
 * @param {number} props.staleTime - Optional stale time for query caching.
 * @param {number} props.gcTime - Optional garbage collection time for query caching.
 *
 * @returns {JSX.Element} The content to be rendered, either a loading skeleton or the team players layout.
 */
function TeamPlayersPage({ staleTime, gcTime }) {
    let content;
    const { teamId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const matchdayId = useSelector((state) => state.matchday.day);
    const { competitionId, abbreviations } = useSelector((state) => state.league);
    const defaults = queryClient.getQueryDefaults();
    const staleTimeValue = staleTime ? staleTime : defaults.staleTime;
    const gcTimeValue = gcTime ? gcTime : defaults.gcTime;

    const [{ data: team, isPending: isPendingTeam }, { data: players, isPending: isPendingPlayers }] = useQueries({
        queries: [
            {
                queryKey: ["teams", competitionId, matchdayId],
                queryFn: async ({ signal }) =>
                    await API.setup({ signal, token }).fetch(Teams, { competitionId, abbreviations }),
                select: (data) => {
                    return data.find((item) => item.teamId === teamId);
                },
                staleTimeValue: staleTimeValue,
                gcTime: gcTimeValue,
                throwOnError: true,
            },
            {
                queryKey: ["teams", competitionId, matchdayId, teamId],
                queryFn: async ({ signal }) =>
                    await API.setup({ signal, token }).fetch(TeamPlayers, { competitionId, teamId }),
                staleTimeValue: staleTimeValue,
                gcTime: gcTimeValue,
                throwOnError: true,
            },
        ],
    });

    if (isPendingPlayers || isPendingTeam) {
        content = <TeamPlayersSkeleton />;
    }

    if (team && players) {
        content = <TeamPlayersLayout players={players} team={team} />;
    }

    return content;
}

export default TeamPlayersPage;
