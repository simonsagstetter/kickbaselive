import TeamsListItem from "./TeamsListItem";
import { motion } from "framer-motion";
import { list } from "@/motion/motionConfig";
import { array } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./TeamsList.Styles";

const _ = new TailwindStyleSheet(styles);

function TeamsList({ teams }) {
    return (
        <motion.ul {...list} className={_.list}>
            {teams.map((team, index) => (
                <TeamsListItem key={team.teamId} team={team} index={index} />
            ))}
        </motion.ul>
    );
}

TeamsList.propTypes = {
    teams: array,
};

export default TeamsList;
