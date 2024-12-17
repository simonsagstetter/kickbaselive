import { Outlet, useParams } from "react-router-dom";
import { number } from "prop-types";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/query/queryClient";
import { API, Teams } from "@/api/http";
import TeamsLayout from "@/components/02_templates/TeamsLayout";
import TeamPageSkeleton from "@/components/02_templates/Skeletons/TeamPageSkeleton";

/**
 * TeamsPage component fetches and displays team data based on the current competition and matchday.
 * It uses React Router's useParams to get the teamId and Redux's useSelector to access the token,
 * competitionId, abbreviations, and matchdayId from the state.
 *
 * @param {Object} props - The properties object.
 * @param {number} props.staleTime - Optional. The time in milliseconds after data is considered stale.
 * @param {number} props.gcTime - Optional. The time in milliseconds after which unused data is garbage collected.
 *
 * @returns {JSX.Element} The content to be rendered, which could be a loading skeleton, a layout of teams, or an outlet for nested routes.
 */
function TeamsPage({ staleTime, gcTime }) {
    let content;
    const { teamId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const { competitionId, abbreviations } = useSelector((state) => state.league);
    const matchdayId = useSelector((state) => state.matchday.day);
    const defaults = queryClient.getQueryDefaults();
    const staleTimeValue = staleTime ? staleTime : defaults.staleTime;
    const gcTimeValue = gcTime ? gcTime : defaults.gcTime;

    const { data: teams, isPending } = useQuery({
        queryKey: ["teams", competitionId, matchdayId],
        queryFn: async ({ signal }) =>
            await API.setup({ signal, token }).fetch(Teams, { competitionId, abbreviations }),
        staleTime: staleTimeValue,
        gcTime: gcTimeValue,
        throwOnError: true,
    });

    if (isPending && !teamId) {
        content = <TeamPageSkeleton />;
    }

    if (teams) {
        content = <TeamsLayout teams={teams} />;
    }

    if (teams && teamId) {
        content = <Outlet />;
    }

    return content;
}

export default TeamsPage;

TeamsPage.propTypes = {
    staleTime: number,
    gcTime: number,
};
