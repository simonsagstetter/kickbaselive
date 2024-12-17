import { startTransition, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLeague } from "@/store/league-slice";
import { API, Leagues } from "@/api/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import LeagueList from "@/components/03_organisms/League/LeagueList";
import { LeagueListSkeleton } from "@/components/04_molecules/Skeletons/skeletons";

/**
 * LeaguePage component responsible for displaying a list of leagues and handling navigation
 * to the matchdays of a selected league.
 *
 * Utilizes React hooks such as useEffect, useSelector, useDispatch, useQuery, and useMutation
 * to manage state and side effects.
 */
function LeaguePage() {
    const navigate = useNavigate();
    const leagueId = useSelector((state) => state.league.id);

    useEffect(() => {
        if (leagueId !== undefined) {
            startTransition(() => {
                navigate(`/leagues/${leagueId}/matchdays`);
            });
        }
    }, [leagueId, navigate]);

    let content;
    const { token, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { data: leagues, isPending } = useQuery({
        queryKey: ["leagues", user.id],
        queryFn: async ({ signal }) => await API.setup({ signal, token }).fetch(Leagues),
        staleTime: 0,
        gcTime: 0,
        throwOnError: true,
    });

    const {
        mutate,
        isPending: isPendingMutation,
        variables,
    } = useMutation({
        mutationFn: async ({ league }) => {
            try {
                await dispatch(setLeague({ league, token })).unwrap();
            } catch (error) {
                throw json(
                    { title: "Could not fetch season data", message: error.message },
                    { status: error.status || 500 }
                );
            }
            return league;
        },
        onSuccess: (data) => {
            startTransition(() => {
                navigate(`${data.id}/matchdays`);
            });
        },
        throwOnError: true,
        gcTime: 0,
    });

    if (leagues) {
        content = (
            <LeagueList
                leagues={leagues}
                mutateFn={mutate}
                isPendingMutation={isPendingMutation}
                pendingItem={variables?.league?.id ?? null}
            />
        );
    }

    if (isPending) {
        content = <LeagueListSkeleton />;
    }
    return content;
}

export default LeaguePage;
