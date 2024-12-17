import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { node } from "prop-types";

function LoginRequiredMiddleware({ children }) {
    const auth = useSelector((state) => state.auth);
    if (!auth.token) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}

LoginRequiredMiddleware.propTypes = {
    children: node.isRequired,
};

export default LoginRequiredMiddleware;
