import { useEffect, useState, startTransition } from "react";
import { useNavigate, json } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMatchday } from "@/store/matchday-slice";
import { useQuery, useMutation } from "@tanstack/react-query";
import { API, Matchdays } from "@/api/http";
import MatchdayList from "@/components/03_organisms/Matchday/MatchdayList";
import { MatchdayListSkeleton } from "@/components/04_molecules/Skeletons/skeletons";
import moment from "moment";
import useDisable from "@/hooks/useDisable";

/**
 * MatchdayPage component handles the logic for displaying and managing matchdays.
 * It uses various hooks to manage state, side effects, and data fetching.
 */
function MatchdayPage() {
    const navigate = useNavigate();
    const disable = useDisable();
    const { currentDay, id: leagueId, matchdayEndTime, seasonEnd } = useSelector((state) => state.league);
    const expires = moment(matchdayEndTime).diff(moment());

    useEffect(() => {
        if (!seasonEnd) {
            const timeout = setTimeout(() => {
                disable(leagueId);
            }, expires);
            return () => clearTimeout(timeout);
        }
    });

    const matchday = useSelector((state) => state.matchday);

    useEffect(() => {
        if (leagueId === undefined) {
            startTransition(() => {
                navigate("/leagues");
            });
        }
        if (matchday.day !== undefined && matchday.live === false) {
            startTransition(() => {
                navigate(`/leagues/${leagueId}/matchdays/${matchday.day}`);
            });
        }
        if (matchday.day !== undefined && matchday.live === true) {
            startTransition(() => {
                navigate(`/leagues/${leagueId}/live`);
            });
        }
    }, [leagueId, matchday, navigate]);

    let content;
    const dispatch = useDispatch();
    const [matchdays, setMatchdays] = useState();
    const { token, user } = useSelector((state) => state.auth);

    const { isPending, refetch } = useQuery({
        queryKey: ["matchdays", user.id, leagueId],
        queryFn: async ({ signal }) => {
            const data = await API.setup({ signal, token }).fetch(Matchdays, {
                leagueId,
                user,
                currentDay,
            });
            setMatchdays(data);
            return data;
        },
        gcTime: 0,
        staleTime: 0,
        throwOnError: true,
    });

    const {
        mutate,
        isPending: isPendingMutation,
        variables,
    } = useMutation({
        mutationFn: async ({ matchday }) => {
            try {
                await dispatch(setMatchday(matchday)).unwrap();
            } catch (error) {
                throw json(
                    { title: "Could not save matchday", message: error.message },
                    { status: error.status || 500 }
                );
            }
            return matchday;
        },
        onSuccess: (data) => {
            if (!data.live) {
                startTransition(() => {
                    navigate(`${data.day}`);
                });
            } else {
                startTransition(() => {
                    navigate(`/leagues/${leagueId}/live/lineup`);
                });
            }
        },
        throwOnError: true,
        gcTime: 0,
    });

    if (matchdays) {
        content = (
            <MatchdayList
                matchdays={matchdays}
                mutateFn={mutate}
                refetchFn={refetch}
                isPendingMutation={isPendingMutation}
                pendingItem={variables?.matchday?.day ?? null}
            />
        );
    }

    if (isPending) {
        content = <MatchdayListSkeleton />;
    }

    return content;
}

export default MatchdayPage;
