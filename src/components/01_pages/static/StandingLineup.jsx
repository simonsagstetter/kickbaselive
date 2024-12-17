import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { API, StandingLineup } from "@/api/http";
import StandingLineupLayout from "@/components/02_templates/StandingLineupLayout";
import StandingLineupSkeleton from "@/components/02_templates/Skeletons/StandingLineupSkeleton";

/**
 * Component for displaying the standing lineup page.
 * It fetches and displays the lineup and standing details for a specific match.
 *
 * @returns {JSX.Element} The content to be rendered, either a loading skeleton or the lineup layout.
 */
function StandingLineupPage() {
    let content;
    const { matchdayId, matchId, teamId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const { season, competitionId } = useSelector((state) => state.league);

    const { data: standing, isPending } = useQuery({
        queryKey: ["standings", matchId, competitionId, teamId, matchdayId],
        queryFn: async ({ signal }) =>
            await API.setup({ signal, token }).fetch(StandingLineup, {
                season,
                matchId,
                competitionId,
                teamId,
                matchdayId,
            }),
        throwOnError: true,
    });

    if (isPending) {
        content = <StandingLineupSkeleton />;
    }

    if (standing) {
        content = <StandingLineupLayout standing={standing.details} lineup={standing.lineup} />;
    }
    return content;
}
export default StandingLineupPage;
