import { array } from "prop-types";
import MatchList from "../03_organisms/Standing/MatchList";
import { Outlet, useParams } from "react-router-dom";
import { TailwindStyleSheet } from "@/utils/tw";
import Header from "../03_organisms/Header/Header";

const _ = new TailwindStyleSheet({
    container: {
        layout: "flex flex-col items-center",
        typo: "text-zinc-200",
        spacing: "pt-4",
    },
    stickyPosClass: {
        layout: "-top-8.5",
    },
});

function StandingLayout({ standings }) {
    const params = useParams();
    const header = {
        title: "Results",
        subtitle: `Bundesliga Matchday ${params.matchdayId}`,
    };
    return (
        <div className={_.container}>
            {!params.teamId ? (
                <>
                    <Header stickyPosClass={_.stickyPosClass}>
                        <Header.Title title={header.title} subtitle={header.subtitle} />
                    </Header>
                    <MatchList matches={standings} />
                </>
            ) : (
                <Outlet />
            )}
        </div>
    );
}

export default StandingLayout;

StandingLayout.propTypes = {
    standings: array.isRequired,
};
