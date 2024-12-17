import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MatchList from "../03_organisms/Standing/MatchList";
import Header from "../03_organisms/Header/Header";
import { TailwindStyleSheet } from "@/utils/tw";

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

function LiveStandingLayout() {
    const params = useParams();
    const standings = useSelector((state) => state.live.standings);
    const header = {
        title: "Results",
        subtitle: `Bundesliga Matchday ${standings[0].matchday}`,
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

export default LiveStandingLayout;
