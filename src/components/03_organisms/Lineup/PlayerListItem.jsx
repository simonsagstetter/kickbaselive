import { motion } from "framer-motion";
import { listItem, liveListItem } from "@/motion/motionConfig";
import { object, bool, number } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./PlayerListItem.Styles";
import PlayerCover from "@/components/04_molecules/Lineup/PlayerCover";
import PlayerDetail from "@/components/04_molecules/Lineup/PlayerDetail";
import PlayerPoints from "@/components/04_molecules/Lineup/PlayerPoints";
import PlayerMatchStatus from "@/components/04_molecules/Lineup/PlayerMatchStatus";

const _ = new TailwindStyleSheet(styles);

function PlayerListItem({ player, rankingMode = false, index, isLive = false }) {
    const motionConfig = isLive ? { ...liveListItem } : { ...listItem };
    return (
        <motion.li {...motionConfig} className={_.item}>
            <PlayerCover {...{ rankingMode, index, player }} />
            <PlayerDetail {...{ player, index, isLive }} />
            {isLive && <PlayerMatchStatus {...{ player }} />}
            <PlayerPoints {...{ player, isLive }} />
        </motion.li>
    );
}

export default PlayerListItem;

PlayerListItem.propTypes = {
    player: object.isRequired,
    rankingMode: bool,
    index: number,
    isLive: bool,
};
