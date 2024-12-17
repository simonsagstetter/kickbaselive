import { number, object } from "prop-types";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";
import { motion } from "framer-motion";
import TeamCover from "@/components/04_molecules/Team/TeamCover";
import TeamDetail from "@/components/04_molecules/Team/TeamDetail";
import TeamStats from "@/components/04_molecules/Team/TeamStats";
import TeamPoints from "@/components/04_molecules/Team/TeamPoints";
import { listItem, listItemHover } from "@/motion/motionConfig";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./TeamsListItem.Styles";

const _ = new TailwindStyleSheet(styles);

function TeamsListItem({ team, index }) {
    const navigate = useNavigate(),
        { teamName, teamLogo, teamId, placement, abbreviation, goalDifference, tablePoints, scorePoints, earnings } =
            team;

    function handleTeamClick() {
        startTransition(() => {
            navigate(teamId);
        });
    }
    return (
        <motion.li {...listItem} {...listItemHover} onClick={handleTeamClick} className={_.listItem}>
            <TeamCover {...{ teamName, teamLogo }} />
            <TeamDetail {...{ placement, teamName, abbreviation, index }} />
            <TeamStats {...{ placement, goalDifference, tablePoints }} />
            <TeamPoints {...{ scorePoints, earnings, index }} />
        </motion.li>
    );
}

TeamsListItem.propTypes = {
    team: object.isRequired,
    index: number,
};

export default TeamsListItem;
