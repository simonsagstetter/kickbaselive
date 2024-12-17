import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { node } from "prop-types";

function LogoutRequiredMiddleware({ children }) {
    const auth = useSelector((state) => state.auth);
    if (auth.token) {
        return <Navigate to="/leagues" replace />;
    }

    return children;
}

LogoutRequiredMiddleware.propTypes = {
    children: node.isRequired,
};

export default LogoutRequiredMiddleware;
