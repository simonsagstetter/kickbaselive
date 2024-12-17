import { node } from "prop-types";
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";

function CockpitMiddleware({ children }) {
    const league = useSelector((state) => state.league);
    const matchday = useSelector((state) => state.matchday);
    const params = useParams();

    if (!league || league.id !== params.leagueId) {
        return <Navigate to="/leagues" relative="route"></Navigate>;
    }
    if (!matchday || matchday.day !== +params.matchdayId || matchday.live) {
        return <Navigate to={`/leagues/${league.id}/matchdays`} relative="route"></Navigate>;
    }

    return children;
}

CockpitMiddleware.propTypes = {
    children: node.isRequired,
};

export default CockpitMiddleware;
