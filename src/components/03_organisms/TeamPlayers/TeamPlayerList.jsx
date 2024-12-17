import { array } from "prop-types";
import { motion } from "framer-motion";
import TeamPlayerListItem from "./TeamPlayerListItem";
import { list } from "@/motion/motionConfig";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./TeamPlayerList.Styles";

const _ = new TailwindStyleSheet(styles);

function TeamPlayerList({ players }) {
    return (
        <motion.ul {...list} className={_.list}>
            {players.map((player, index) => (
                <TeamPlayerListItem key={player.playerId} {...{ player, index }} />
            ))}
        </motion.ul>
    );
}

export default TeamPlayerList;

TeamPlayerList.propTypes = {
    players: array.isRequired,
};
