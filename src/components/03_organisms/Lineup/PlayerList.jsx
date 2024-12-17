import { list } from "@/motion/motionConfig";
import PlayerListItem from "./PlayerListItem";
import { motion } from "framer-motion";
import { array, bool } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./PlayerList.Styles";

const _ = new TailwindStyleSheet(styles);

function PlayerList({ start11, res = [], rankingMode = false, isLive = false }) {
    return (
        <motion.ul {...list} className={_.list}>
            {start11.map((player, index) => (
                <PlayerListItem key={player.playerId} {...{ player, rankingMode, index, isLive }} />
            ))}
            {res.length > 0 && (
                <>
                    <h1 className={_.heading}>Not lined up players</h1>
                    {res.map((player) => (
                        <PlayerListItem key={player.playerId} {...{ player, isLive }} />
                    ))}
                </>
            )}
        </motion.ul>
    );
}

export default PlayerList;

PlayerList.propTypes = {
    start11: array.isRequired,
    res: array,
    rankingMode: bool,
    isLive: bool,
};
