import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/auth-slice";
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/query/queryClient";
import UserNav from "@/components/03_organisms/Navigation/UserNav";
import moment from "moment";

/**
 * RootLayout component is responsible for providing the main layout structure
 * for the application. It manages user session expiration and handles automatic
 * logout when the session expires.
 *
 * @returns {JSX.Element} The layout component containing navigation and outlet for nested routes.
 */
function RootLayout() {
    const [expired, setExpired] = useState(true);
    const dispatch = useDispatch();
    const tokenExp = useSelector((state) => state.auth.tokenExp);
    const expires = moment(tokenExp).diff(moment());

    useEffect(() => {
        if (expires && expires > 0) {
            setExpired(false);
        }
    }, [expires]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(logout());
        }, expires);
        return () => clearTimeout(timeout);
    });

    return (
        <QueryClientProvider client={queryClient}>
            <UserNav />
            {!expired && <Outlet />}
        </QueryClientProvider>
    );
}

export default RootLayout;
