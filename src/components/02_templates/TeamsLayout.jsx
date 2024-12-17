import { Outlet, useParams } from "react-router-dom";
import TeamsList from "../03_organisms/Teams/TeamsList";
import { TailwindStyleSheet } from "@/utils/tw";
import Header from "../03_organisms/Header/Header";
import { array } from "prop-types";

const _ = new TailwindStyleSheet({
    container: {
        layout: "flex flex-col",
        sizing: "w-full",
    },
    stickyPosClass: {
        layout: "-top-8.5",
    },
});

function TeamsLayout({ teams }) {
    const params = useParams();
    const header = {
        title: "Leaderboard",
        subtitle: "Bundesliga",
    };
    return (
        <div className={_.container}>
            {!params.teamId ? (
                <>
                    <Header stickyPosClass={_.stickyPosClass}>
                        <Header.Title {...header} />
                    </Header>
                    <TeamsList teams={teams} />
                </>
            ) : (
                <Outlet />
            )}
        </div>
    );
}

export default TeamsLayout;

TeamsLayout.propTypes = {
    teams: array.isRequired,
};
