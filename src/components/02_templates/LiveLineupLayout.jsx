import { useSelector } from "react-redux";
import { TailwindStyleSheet } from "@/utils/tw";
import Header from "../03_organisms/Header/Header";
import PlayerList from "../03_organisms/Lineup/PlayerList";

const _ = new TailwindStyleSheet({
    container: {
        layout: "flex flex-col",
        sizing: "w-full",
    },
    stickyPosClass: {
        layout: "-top-32",
        responsive: {
            sm: {
                layout: "max-sm:-top-28",
            },
        },
    },
});

function LiveLineupLayout() {
    const { manager, players } = useSelector((state) => state.live.managerDetail);
    const { dayPoints, userName, userAvatar, dayPlacement } = manager;
    const addClasses = dayPlacement === 1 ? "!text-kbgreen" : "";
    const start11 = players.filter((player) => player.lineup === true);
    const res = players.filter((player) => player.lineup === false);

    return (
        <div className={_.container}>
            <Header stickyPosClass={_.stickyPosClass}>
                <Header.Manager badgeText={dayPlacement} image={userAvatar} />
                <Header.Title title={dayPoints} subtitle={userName} animated addClasses={addClasses} />
            </Header>
            <PlayerList start11={start11} res={res} isLive />;
        </div>
    );
}

export default LiveLineupLayout;
