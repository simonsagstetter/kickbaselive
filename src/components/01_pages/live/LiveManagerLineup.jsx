import { useParams } from "react-router-dom";
import LiveLineupLayout from "@/components/02_templates/LiveLineupLayout";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { API, ManagerLineup } from "@/api/http";
import ManagerLineupSkeleton from "@/components/02_templates/Skeletons/ManagerLineupSkeleton";
import { setManagerDetail } from "@/store/live-slice";
import useDisable from "@/hooks/useDisable";
import { liveRefetchInterval } from "@/query/queryClient";

/**
 * Component for managing the live lineup page for a manager.
 *
 * @param {Object} props - The component props.
 * @param {string} props.userId - The user ID of the manager.
 *
 * @returns {JSX.Element} The content to be rendered, either a skeleton or the live lineup layout.
 */
function LiveManagerLineupPage({ userId }) {
    let content;
    const dispatch = useDispatch();
    const disable = useDisable();
    const { leagueId, managerId: paramManagerId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const matchdayId = useSelector((state) => state.matchday.day);
    const { season, competitionId } = useSelector((state) => state.league);
    const managerId = userId ? userId : paramManagerId;

    const { data: managerDetail, isPending } = useQuery({
        queryKey: ["live", "managers", leagueId, matchdayId, managerId],
        queryFn: async ({ signal }) => {
            const managerDetail = await API.setup({ signal, token }).fetch(ManagerLineup, {
                season,
                leagueId,
                matchdayId,
                managerId,
                isLive: true,
                competitionId,
            });
            await dispatch(setManagerDetail(managerDetail)).unwrap();
            return managerDetail;
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
        content = <ManagerLineupSkeleton />;
    }

    if (managerDetail) {
        content = <LiveLineupLayout key={managerId} />;
    }

    return content;
}

export default LiveManagerLineupPage;
