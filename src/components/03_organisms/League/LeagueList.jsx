import PropTypes from "prop-types";
import { list } from "@/motion/motionConfig";
import LeagueListItem from "./LeagueListItem";
import { motion, AnimatePresence } from "framer-motion";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./LeagueList.Styles";

const _ = new TailwindStyleSheet(styles);

function LeagueList({ leagues, mutateFn, isPendingMutation, pendingItem }) {
    return (
        <div className={_.leaguesContainer}>
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", duration: 2 }}
                className={_.leaguesHeading}
            >
                Choose your league
            </motion.h1>
            <AnimatePresence>
                {leagues.length > 0 && (
                    <motion.ul {...list} className={_.leaguesList}>
                        {leagues.map((league) => (
                            <LeagueListItem
                                key={league.id}
                                league={league}
                                mutateFn={mutateFn}
                                isPendingMutation={isPendingMutation}
                                isPendingItem={league.id === pendingItem && true}
                            />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

LeagueList.propTypes = {
    leagues: PropTypes.array.isRequired,
    mutateFn: PropTypes.func.isRequired,
    isPendingMutation: PropTypes.bool.isRequired,
    pendingItem: PropTypes.string,
};

export default LeagueList;
