import { useParams } from "react-router-dom";
import PlayerList from "../03_organisms/Lineup/PlayerList";
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

function TopLayout({ players }) {
    const { matchdayId } = useParams();
    const header = {
        title: "Top 25",
        subtitle: `Best players in matchday ${matchdayId}`,
    };
    return (
        <div className={_.container}>
            <Header stickyPosClass={_.stickyPosClass}>
                <Header.Title {...header} />
            </Header>
            <PlayerList start11={players} rankingMode={true} />;
        </div>
    );
}

export default TopLayout;

TopLayout.propTypes = {
    players: array.isRequired,
};
