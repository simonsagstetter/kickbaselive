import { TailwindStyleSheet } from "@/utils/tw";
import TeamPlayerList from "../03_organisms/TeamPlayers/TeamPlayerList";
import Header from "../03_organisms/Header/Header";
import { array, object } from "prop-types";

const _ = new TailwindStyleSheet({
    stickyPosClass: {
        layout: "-top-36",
        responsive: { sm: { layout: "max-sm:-top-28" } },
    },
});

function TeamPlayersLayout({ team, players }) {
    const { scorePoints, teamName, teamLogo, placement } = team;
    const header = {
        title: scorePoints,
        subtitle: teamName,
    };
    return (
        <>
            <Header stickyPosClass={_.stickyPosClass}>
                <Header.Team {...{ placement, teamLogo }} />
                <Header.Title {...{ ...header, animated: true }} />
            </Header>
            <TeamPlayerList players={players} />
        </>
    );
}

export default TeamPlayersLayout;

TeamPlayersLayout.propTypes = {
    team: object.isRequired,
    players: array.isRequired,
};
