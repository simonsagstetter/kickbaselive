import { TailwindStyleSheet } from "@/utils/tw";
import { useSelector } from "react-redux";
import Header from "../03_organisms/Header/Header";
import PlayerList from "../03_organisms/Lineup/PlayerList";

const _ = new TailwindStyleSheet({
    container: {
        layout: "flex flex-col",
        sizing: "w-full",
    },
    stickyPosClass: {
        layout: "-top-8.5",
    },
});

function LiveTopLayout() {
    const matchdayId = useSelector((state) => state.matchday.day);
    const players = useSelector((state) => state.live.top);
    const header = {
        title: "Top 25",
        subtitle: `Best players in matchday ${matchdayId}`,
    };
    return (
        <div className={_.container}>
            <Header stickyPosClass={_.stickyPosClass}>
                <Header.Title {...header} />
            </Header>
            <PlayerList start11={players} isLive />
        </div>
    );
}

export default LiveTopLayout;
