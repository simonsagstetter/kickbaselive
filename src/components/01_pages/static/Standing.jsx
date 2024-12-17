import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { API, Standing } from "@/api/http";
import StandingLayout from "@/components/02_templates/StandingLayout";
import StandingPageSkeleton from "@/components/02_templates/Skeletons/StandingPageSkeleton";

/**
 * Component representing the Standing Page.
 * It fetches and displays the standings for a specific competition and matchday.
 * If a matchId and teamId are provided, it renders an Outlet for nested routes.
 *
 * @returns {JSX.Element} The content to be rendered, which could be a skeleton loader,
 *                        the standings layout, or an outlet for nested routes.
 */
function StandingPage() {
    let content;
    const { matchdayId, matchId, teamId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const competitionId = useSelector((state) => state.league.competitionId);

    const { data: standings, isPending } = useQuery({
        queryKey: ["standings", competitionId, matchdayId],
        queryFn: async ({ signal }) =>
            await API.setup({ signal, token }).fetch(Standing, { competitionId, matchdayId }),
        throwOnError: true,
    });

    if (isPending && !matchId) {
        content = <StandingPageSkeleton />;
    }

    if (standings) {
        content = <StandingLayout standings={standings} />;
    }

    if (standings && matchId && teamId) {
        content = <Outlet />;
    }

    return content;
}

export default StandingPage;
