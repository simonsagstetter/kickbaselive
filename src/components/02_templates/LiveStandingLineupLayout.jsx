import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../03_organisms/Header/Header";
import { TailwindStyleSheet } from "@/utils/tw";
import { useMemo } from "react";
import LineupNotAvailable from "../03_organisms/Lineup/LineupNotAvailable";
import PlayerList from "../03_organisms/Lineup/PlayerList";

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

function LiveStandingLineupLayout() {
    const { teamId } = useParams();
    const { details, lineup } = useSelector((state) => state.live.standingDetail);

    const { team1, team2, matchFinished, matchDateTimeRaw } = details;

    const currentTeamKey = team1.id === teamId ? TEAM1 : TEAM2;
    const teamPoints = useMemo(() => lineup.reduce((points, player) => (points += player.dayPoints), 0), [lineup]);
    const team1Won = matchFinished ? team1.goals > team2.goals : false;
    const team2Won = matchFinished ? team1.goals < team2.goals : false;

    const addClasses =
        (team1Won && currentTeamKey === "team1") || (team2Won && currentTeamKey === "team2")
            ? "text-kbgreen"
            : (team2Won && currentTeamKey === "team1") || (team1Won && currentTeamKey === "team2")
            ? "text-kborange"
            : "";

    const headerStanding = {
        score: `${team1.goals}:${team2.goals}`,
        team1Won,
        team1Logo: team1.logo,
        team1Name: team1.abbreviation,
        team2Won,
        team2Logo: team2.logo,
        team2Name: team2.abbreviation,
    };

    return (
        <div className={_.container}>
            <Header stickyPosClass={_.stickyPosClass}>
                <Header.Standing {...headerStanding} />
                <Header.Title
                    title={teamPoints}
                    subtitle={details[currentTeamKey].name}
                    animated
                    addClasses={addClasses}
                />
            </Header>
            {lineup.length > 0 ? (
                <PlayerList start11={lineup} isLive />
            ) : (
                <LineupNotAvailable {...{ matchDateTimeRaw }} />
            )}
        </div>
    );
}

export default LiveStandingLineupLayout;
