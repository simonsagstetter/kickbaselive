import { useRef, useEffect } from "react";
import { Outlet, useLocation, useNavigation, useParams } from "react-router-dom";
import CockpitNav from "@/components/03_organisms/Cockpit/CockpitNav";
import LayoutContentWrapper from "@/components/04_molecules/Layout/LayoutContentWrapper";
import LayoutNavWrapper from "@/components/04_molecules/Layout/LayoutNavWrapper";
import useDisable from "@/hooks/useDisable";
import { useSelector } from "react-redux";
import moment from "moment";

/**
 * LiveLayout component manages the layout for live content, handling navigation and content scrolling.
 * It uses React hooks to manage side effects and state.
 */
function LiveLayout() {
    const { leagueId } = useParams();
    const { pathname } = useLocation();
    const content = useRef();
    const navigation = useNavigation();
    const disable = useDisable();
    const liveExp = useSelector((state) => state.league.matchdayEndTime);

    const isLoading = navigation.state === "loading";
    const expires = moment(liveExp).diff(moment());

    useEffect(() => {
        const timeout = setTimeout(() => {
            disable(leagueId);
        }, expires);
        return () => clearTimeout(timeout);
    });

    useEffect(() => {
        content.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname, isLoading]);

    return (
        <>
            <LayoutContentWrapper ref={content}>
                <Outlet />
            </LayoutContentWrapper>
            <LayoutNavWrapper>
                <CockpitNav />
            </LayoutNavWrapper>
        </>
    );
}

export default LiveLayout;
