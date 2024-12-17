import { motion } from "framer-motion";
import { listItem } from "@/motion/motionConfig";
import PlayerCover from "@/components/04_molecules/Lineup/PlayerCover";
import PlayerPoints from "@/components/04_molecules/Lineup/PlayerPoints";
import PlayerDetail from "@/components/04_molecules/Lineup/PlayerDetail";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./TeamPlayerListItem.Styles";
import { number, object } from "prop-types";

const _ = new TailwindStyleSheet(styles);

function TeamPlayerListItem({ player, index }) {
    const options = {
        showMatchtime: false,
        showPlaytime: false,
        showAverage: true,
        showEvents: false,
        showStatus: false,
    };
    return (
        <motion.li {...listItem} className={_.item}>
            <PlayerCover {...{ index, player }} />
            <PlayerDetail {...{ player, index, options }} />
            <PlayerPoints {...{ player, index, showTotals: true }} />
        </motion.li>
    );
}

TeamPlayerListItem.propTypes = {
    player: object.isRequired,
    index: number,
};

export default TeamPlayerListItem;
