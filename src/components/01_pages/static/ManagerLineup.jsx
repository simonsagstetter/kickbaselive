import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { API, ManagerLineup } from "@/api/http";
import LineupLayout from "@/components/02_templates/LineupLayout";
import ManagerLineupSkeleton from "@/components/02_templates/Skeletons/ManagerLineupSkeleton";

/**
 * Component for rendering the manager lineup page.
 *
 * @param {Object} props - The component props.
 * @param {string} props.userId - The user ID, if available.
 *
 * @returns {JSX.Element} The content to be rendered, either a loading skeleton or the lineup layout.
 */
function ManagerLineupPage({ userId }) {
    let content;
    const { leagueId, matchdayId, managerId: paramManagerId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const season = useSelector((state) => state.league.season);
    const managerId = userId ? userId : paramManagerId;

    const { data: lineup, isPending } = useQuery({
        queryKey: ["managers", leagueId, matchdayId, managerId],
        queryFn: async ({ signal }) =>
            await API.setup({ signal, token }).fetch(ManagerLineup, {
                season,
                leagueId,
                matchdayId,
                managerId,
            }),
        throwOnError: true,
    });

    if (isPending) {
        content = <ManagerLineupSkeleton />;
    }
    if (lineup) {
        content = <LineupLayout key={managerId} lineup={lineup} />;
    }

    return content;
}

export default ManagerLineupPage;
