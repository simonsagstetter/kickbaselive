import { object } from "prop-types";
import PlayerList from "../03_organisms/Lineup/PlayerList";
import { TailwindStyleSheet } from "@/utils/tw";
import Header from "../03_organisms/Header/Header";

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

function LineupLayout({ lineup }) {
    const { manager, players } = lineup;
    const { dayPoints, userName, userAvatar, dayPlacement } = manager;
    const addClasses = dayPlacement === 1 ? "!text-kbgreen" : "";
    const start11 = players.filter(({ lineup }) => lineup === true);
    const res = players.filter(({ lineup }) => lineup === false);

    return (
        <div className={_.container}>
            <Header stickyPosClass={_.stickyPosClass}>
                <Header.Manager badgeText={dayPlacement} image={userAvatar} />
                <Header.Title title={dayPoints} subtitle={userName} animated addClasses={addClasses} />
            </Header>
            <PlayerList {...{ start11, res }} />;
        </div>
    );
}

export default LineupLayout;

LineupLayout.propTypes = {
    lineup: object,
};
