import { useParams } from "react-router-dom";
import TopLayout from "@/components/02_templates/TopLayout";
import TopPageSkeleton from "@/components/02_templates/Skeletons/TopPageSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { API, Top25 } from "@/api/http";

/**
 * TopPage component fetches and displays the top players for a given competition and matchday.
 * It uses Redux to access the authentication token and league details, and React Router to get the matchday ID.
 * The component uses a query to fetch player data and conditionally renders a loading skeleton or the player layout.
 *
 * @returns {JSX.Element} The content to be rendered, either a loading skeleton or the top players layout.
 */
function TopPage() {
    let content;
    const token = useSelector((state) => state.auth.token);
    const { competitionId, season } = useSelector((state) => state.league);
    const { matchdayId } = useParams();

    const { data: players, isPending } = useQuery({
        queryKey: ["top", competitionId, matchdayId],
        queryFn: async ({ signal }) =>
            await API.setup({ signal, token }).fetch(Top25, { season, competitionId, matchdayId }),
        throwOnError: true,
    });

    if (isPending) {
        content = <TopPageSkeleton />;
    }

    if (players) {
        content = <TopLayout players={players} />;
    }

    return content;
}

export default TopPage;
