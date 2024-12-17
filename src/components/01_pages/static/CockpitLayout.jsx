import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { indexDBPersister, BUSTER, queryClient } from "@/query/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import CockpitNav from "@/components/03_organisms/Cockpit/CockpitNav";
import LayoutContentWrapper from "@/components/04_molecules/Layout/LayoutContentWrapper";
import LayoutNavWrapper from "@/components/04_molecules/Layout/LayoutNavWrapper";

/**
 * CockpitLayout component is responsible for rendering the main layout of the cockpit.
 * It handles the scrolling behavior when the pathname or loading state changes.
 * It also sets up the query client provider with persistence options.
 */
function CockpitLayout() {
    const { pathname } = useLocation();
    const content = useRef();
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    useEffect(() => {
        content.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname, isLoading]);

    return (
        <>
            <LayoutContentWrapper ref={content}>
                <PersistQueryClientProvider
                    client={queryClient}
                    persistOptions={{
                        persister: indexDBPersister,
                        buster: BUSTER,
                        maxAge: queryClient.getQueryDefaults().gcTime - 1000,
                    }}
                >
                    <Outlet />
                </PersistQueryClientProvider>
            </LayoutContentWrapper>
            <LayoutNavWrapper>
                <CockpitNav />
            </LayoutNavWrapper>
        </>
    );
}

export default CockpitLayout;
