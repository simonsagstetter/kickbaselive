import { Outlet, useParams } from "react-router-dom";
import { API, Managers } from "@/api/http";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ManagerList from "@/components/03_organisms/Manager/ManagerList";
import { ManagerListSkeleton } from "@/components/04_molecules/Skeletons/skeletons";
import { setManagers } from "@/store/live-slice";
import { liveRefetchInterval } from "@/query/queryClient";

/**
 * Component representing the Live Manager Page.
 * This component fetches and displays a list of managers for a specific league and matchday.
 * It handles different states such as loading, displaying the list of managers, or showing a specific manager's details.
 */
function LiveManagerPage() {
    let content;
    const dispatch = useDispatch();
    const { leagueId, managerId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const matchdayId = useSelector((state) => state.matchday.day);
    const competitionId = useSelector((state) => state.league.competitionId);

    const { data: managers, isPending } = useQuery({
        queryKey: ["live", "managers", leagueId, matchdayId],
        queryFn: async ({ signal }) => {
            const data = await API.setup({ signal, token }).fetch(Managers, {
                leagueId,
                matchdayId,
                isLive: true,
                competitionId,
            });
            await dispatch(setManagers(data)).unwrap();
            return data;
        },
        staleTime: 0,
        gcTime: 0,
        refetchInterval: liveRefetchInterval,
        refetchIntervalInBackground: false,
        throwOnError: true,
        enabled: !managerId,
    });

    if (isPending) {
        content = <ManagerListSkeleton />;
    }

    if (managers) {
        content = <ManagerList />;
    }

    if (managerId) {
        content = <Outlet />;
    }

    return content;
}

export default LiveManagerPage;
