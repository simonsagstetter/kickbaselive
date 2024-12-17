import { motion } from "framer-motion";
import { listItemHover, listItem } from "@/motion/motionConfig";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./MatchListItem.Styles";
import { object } from "prop-types";
import Opponent from "@/components/04_molecules/Standing/Opponent";
import Score from "@/components/04_molecules/Standing/Score";

const _ = new TailwindStyleSheet(styles);

function MatchListItem({ match }) {
    const { matchId, matchStarted, matchRunning, matchTimeHumanized, team1, team2 } = match,
        firstOpp = {
            matchId,
            id: team1.id,
            logo: team1.logo,
            name: team1.name,
            abbreviation: team1.abbreviation,
        },
        secondOpp = {
            matchId,
            id: team2.id,
            logo: team2.logo,
            name: team2.name,
            abbreviation: team2.abbreviation,
        };

    return (
        <motion.li {...listItem} {...listItemHover} className={_.listItemWrapper}>
            <div className={_.listItem}>
                <Opponent {...firstOpp} />
                <Score {...{ matchRunning, matchStarted, matchTimeHumanized, team1, team2 }} />
                <Opponent isSecond {...secondOpp} />
            </div>
        </motion.li>
    );
}

MatchListItem.propTypes = {
    match: object.isRequired,
};

export default MatchListItem;
