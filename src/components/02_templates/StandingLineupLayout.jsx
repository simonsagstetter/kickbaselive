import PlayerList from "../03_organisms/Lineup/PlayerList";
import { useParams } from "react-router-dom";
import { TailwindStyleSheet } from "@/utils/tw";
import Header from "../03_organisms/Header/Header";
import { object, array } from "prop-types";
import { useMemo } from "react";

const _ = new TailwindStyleSheet({
    container: {
        layout: "flex flex-col w-full",
    },
    stickyPosClass: {
        layout: "-top-20",
    },
});

const TEAM1 = "team1";
const TEAM2 = "team2";

function StandingLineupLayout({ standing, lineup }) {
    const { teamId } = useParams();
    const { team1, team2 } = standing;

    const currentTeamKey = standing.team1.id === teamId ? TEAM1 : TEAM2;

    const team1Won = team1.goals > team2.goals;
    const team2Won = team1.goals < team2.goals;

    const teamPoints = useMemo(
        () =>
            lineup
                .filter((player) => player.teamId === standing[currentTeamKey].id)
                .reduce((points, player) => (points += player.dayPoints), 0),
        [lineup, standing, currentTeamKey]
    );

    const addClasses =
        (team1Won && currentTeamKey === "team1") || (team2Won && currentTeamKey === "team2")
            ? "text-kbgreen"
            : (team2Won && currentTeamKey === "team1") || (team1Won && currentTeamKey === "team2")
            ? "text-kborange"
            : "";

    const headerStanding = {
        score: `${team1.goals}:${team2.goals}`,
        team1Name: team1.abbreviation,
        team1Logo: team1.logo,
        team1Won: team1Won,
        team2Name: team2.abbreviation,
        team2Won: team2Won,
        team2Logo: team2.logo,
    };

    return (
        <div className={_.container}>
            <Header stickyPosClass={_.stickyPosClass}>
                <Header.Standing {...headerStanding} />
                <Header.Title
                    title={teamPoints}
                    subtitle={standing[currentTeamKey].name}
                    animated
                    addClasses={addClasses}
                />
            </Header>
            <PlayerList start11={lineup} />
        </div>
    );
}

export default StandingLineupLayout;

StandingLineupLayout.propTypes = {
    standing: object.isRequired,
    lineup: array.isRequired,
};
