import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { API, Managers } from "@/api/http";
import ManagerList from "@/components/03_organisms/Manager/ManagerList";
import { ManagerListSkeleton } from "@/components/04_molecules/Skeletons/skeletons";

/**
 * ManagerPage component responsible for rendering the manager-related content.
 * It utilizes the useParams hook to extract leagueId, matchdayId, and managerId from the URL.
 * It also uses the useSelector hook to access the authentication token from the Redux store.
 * The component fetches manager data using the useQuery hook and displays different content
 * based on the loading state and the presence of manager data.
 *
 * @returns {JSX.Element} The content to be rendered, which can be a skeleton loader, a list of managers, or an outlet for nested routes.
 */
function ManagerPage() {
    let content;
    const { leagueId, matchdayId, managerId } = useParams();
    const token = useSelector((state) => state.auth.token);

    const { data: managers, isPending } = useQuery({
        queryKey: ["managers", leagueId, matchdayId],
        queryFn: async ({ signal }) => await API.setup({ signal, token }).fetch(Managers, { leagueId, matchdayId }),
        throwOnError: true,
    });

    if (isPending && !managerId) {
        content = <ManagerListSkeleton />;
    }

    if (managers) {
        content = <ManagerList managers={managers} />;
    }

    if (managers && managerId) {
        content = <Outlet />;
    }

    return content;
}

export default ManagerPage;
