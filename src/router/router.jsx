/* eslint-disable react-refresh/only-export-components */
/* deactivated because this is a false positiv */

// React Core
import { lazy, Suspense } from "react";

// React Router
import { createBrowserRouter, Navigate } from "react-router-dom";

// Middleware
import LoginRequiredMiddleware from "./middleware/LoginRequiredMiddleware";
import LogoutRequiredMiddleware from "./middleware/LogoutRequiredMiddleware";
import CockpitMiddleware from "./middleware/CockpitMiddleware";
import AnimatedMiddleware from "./middleware/AnimatedMiddleware";

// Error Boundary
import ErrorPage from "../components/01_pages/Error";

// Outlet Layout Roots
import RootLayout from "../components/01_pages/Root";
import CockpitLayout from "../components/01_pages/static/CockpitLayout";
import LiveLayout from "../components/01_pages/live/LiveLayout";

// Components
import LoginPage, { loginAction, logoutAction } from "../components/01_pages/Login";

// Leagues Selector
import LeaguePage from "../components/01_pages/League";

// Matchday Selector
import MatchdayPage from "../components/01_pages/Matchday";

// Skeleton
import ManagerLineupSkeleton from "../components/02_templates/Skeletons/ManagerLineupSkeleton";
import StandingPageSkeleton from "../components/02_templates/Skeletons/StandingPageSkeleton";
import StandingLineupSkeleton from "../components/02_templates/Skeletons/StandingLineupSkeleton";
import TopPageSkeleton from "../components/02_templates/Skeletons/TopPageSkeleton";
import TeamPageSkeleton from "../components/02_templates/Skeletons/TeamPageSkeleton";
import TeamPlayersSkeleton from "../components/02_templates/Skeletons/TeamPlayersSkeleton";
import { ManagerListSkeleton } from "../components/04_molecules/Skeletons/skeletons";

// Live Pages
const LiveManagerPage = lazy(() => import("../components/01_pages/live/LiveManager"));
const LiveManagerLineupPage = lazy(() => import("../components/01_pages/live/LiveManagerLineup"));
const LiveLineup = lazy(() => import("../components/01_pages/live/LiveLineup"));
const LiveMiddleware = lazy(() => import("./middleware/LiveMiddleware"));
const LiveStandingsPage = lazy(() => import("../components/01_pages/live/LiveStandings"));
const LiveStandingLineupPage = lazy(() => import("../components/01_pages/live/LiveStandingLineup"));
const LiveTopPage = lazy(() => import("../components/01_pages/live/LiveTop"));

// Cockpit Pages
const LineupPage = lazy(() => import("../components/01_pages/static/Lineup"));
const ManagerPage = lazy(() => import("../components/01_pages/static/Manager"));
const ManagerLineupPage = lazy(() => import("../components/01_pages/static/ManagerLineup"));
const StandingPage = lazy(() => import("../components/01_pages/static/Standing"));
const StandingLineupPage = lazy(() => import("../components/01_pages/static/StandingLineup"));
const TopPage = lazy(() => import("../components/01_pages/static/Top"));
const TeamsPage = lazy(() => import("../components/01_pages/static/Teams"));
const TeamPlayersPage = lazy(() => import("../components/01_pages/static/TeamPlayers"));

export const router = createBrowserRouter([
    {
        path: "/leagues",
        id: "root",
        element: (
            <LoginRequiredMiddleware>
                <RootLayout />
            </LoginRequiredMiddleware>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <AnimatedMiddleware>
                        <LeaguePage />
                    </AnimatedMiddleware>
                ),
                errorElement: <ErrorPage />,
            },
            {
                path: ":leagueId/matchdays",
                element: (
                    <AnimatedMiddleware>
                        <MatchdayPage />
                    </AnimatedMiddleware>
                ),
                errorElement: <ErrorPage />,
            },
            {
                path: ":leagueId/matchdays/:matchdayId",
                id: "cockpitroot",
                element: (
                    <CockpitMiddleware>
                        <CockpitLayout />
                    </CockpitMiddleware>
                ),
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="lineup" relative="path" />,
                    },
                    {
                        path: "lineup",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<ManagerLineupSkeleton />}>
                                    <LineupPage />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                    },
                    {
                        path: "managers",
                        id: "managers",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<ManagerListSkeleton />}>
                                    <ManagerPage />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                        children: [
                            {
                                path: ":managerId",
                                element: (
                                    <AnimatedMiddleware>
                                        <Suspense fallback={<ManagerLineupSkeleton />}>
                                            <ManagerLineupPage />
                                        </Suspense>
                                    </AnimatedMiddleware>
                                ),
                            },
                        ],
                    },
                    {
                        path: "standings",
                        id: "standings",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<StandingPageSkeleton />}>
                                    <StandingPage />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                        children: [
                            {
                                path: ":matchId/team/:teamId",
                                element: (
                                    <AnimatedMiddleware>
                                        <Suspense fallback={<StandingLineupSkeleton />}>
                                            <StandingLineupPage />
                                        </Suspense>
                                    </AnimatedMiddleware>
                                ),
                            },
                        ],
                    },
                    {
                        path: "top",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<TopPageSkeleton />}>
                                    <TopPage />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                    },
                    {
                        path: "teams",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<TeamPageSkeleton />}>
                                    <TeamsPage />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                        children: [
                            {
                                path: ":teamId",
                                element: (
                                    <AnimatedMiddleware>
                                        <Suspense fallback={<TeamPlayersSkeleton />}>
                                            <TeamPlayersPage />
                                        </Suspense>
                                    </AnimatedMiddleware>
                                ),
                            },
                        ],
                    },
                ],
            },
            {
                path: ":leagueId/live",
                id: "liveroot",
                element: (
                    <LiveMiddleware>
                        <LiveLayout />
                    </LiveMiddleware>
                ),
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="lineup" relative="path" />,
                    },
                    {
                        path: "lineup",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<ManagerLineupSkeleton />}>
                                    <LiveLineup />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                    },
                    {
                        path: "managers",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<ManagerListSkeleton />}>
                                    <LiveManagerPage />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                        children: [
                            {
                                path: ":managerId",
                                element: (
                                    <AnimatedMiddleware>
                                        <Suspense fallback={<ManagerLineupSkeleton />}>
                                            <LiveManagerLineupPage />
                                        </Suspense>
                                    </AnimatedMiddleware>
                                ),
                            },
                        ],
                    },
                    {
                        path: "standings",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<StandingPageSkeleton />}>
                                    <LiveStandingsPage />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                        children: [
                            {
                                path: ":matchId/team/:teamId",
                                element: (
                                    <AnimatedMiddleware>
                                        <Suspense fallback={<StandingLineupSkeleton />}>
                                            <LiveStandingLineupPage />
                                        </Suspense>
                                    </AnimatedMiddleware>
                                ),
                            },
                        ],
                    },
                    {
                        path: "top",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<TopPageSkeleton />}>
                                    <LiveTopPage />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                    },
                    {
                        path: "teams",
                        element: (
                            <AnimatedMiddleware>
                                <Suspense fallback={<TeamPageSkeleton />}>
                                    <TeamsPage staleTime={1000} gcTime={1000} />
                                </Suspense>
                            </AnimatedMiddleware>
                        ),
                        children: [
                            {
                                path: ":teamId",
                                element: (
                                    <AnimatedMiddleware>
                                        <Suspense fallback={<TeamPlayersSkeleton />}>
                                            <TeamPlayersPage staleTime={1000} gcTime={1000} />
                                        </Suspense>
                                    </AnimatedMiddleware>
                                ),
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "/auth/login",
        element: (
            <LogoutRequiredMiddleware>
                <LoginPage />
            </LogoutRequiredMiddleware>
        ),
        action: loginAction,
    },
    {
        path: "/auth/logout",
        element: <Navigate to="/auth/login" replace />,
        action: logoutAction,
    },
    {
        path: "*",
        element: (
            <LoginRequiredMiddleware>
                <Navigate to="/leagues" replace />
            </LoginRequiredMiddleware>
        ),
    },
]);
