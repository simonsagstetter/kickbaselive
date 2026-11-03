import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "@/store/auth-slice";
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/query/queryClient";
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

    useEffect(() => {
        const removeBadge = () => {
            if( globalThis.window !== undefined) {
                const netlifyIframeElem = globalThis.window.document.getElementById("nl-hud-frame");
                if(netlifyIframeElem) {
                    netlifyIframeElem.remove();
                    console.info("Removing nl-hud-frame");
                    return true
                }
            }
            return false;
        }

        if(removeBadge()) return;


        const observer = new MutationObserver(() => {
            const removed = removeBadge();
            if(removed) observer.disconnect();
        });

        if(globalThis.window !== undefined) {
            observer.observe(globalThis.window.document,{
                childList: true,
                subtree: true,
            });
        }

        return () => observer.disconnect();
    });

    return (
        <QueryClientProvider client={getQueryClient()}>
            <UserNav />
            {!expired && <Outlet />}
        </QueryClientProvider>
    );
}

export default RootLayout;
