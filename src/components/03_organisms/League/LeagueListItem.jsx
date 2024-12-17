import PropTypes from "prop-types";
import ListItemLoading from "@/components/04_molecules/UI/ListItemLoading";
import LeagueHeader from "@/components/04_molecules/League/LeagueHeader";
import { motion } from "framer-motion";
import { listItem, listItemHover } from "@/motion/motionConfig";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./LeagueListItem.Styles";
import LeagueDetails from "@/components/04_molecules/League/LeagueDetails";

const _ = new TailwindStyleSheet(styles);

function LeagueListItem({ league, mutateFn, isPendingMutation, isPendingItem }) {
    const { avatar, name, rank, teamValue, budget, squadCount } = league;

    function handleLeagueClick() {
        if (isPendingMutation) {
            return;
        }
        mutateFn({ league });
    }
    return (
        <motion.li
            {...listItem}
            {...listItemHover}
            className={`${_.leagueItem} ${isPendingMutation && "pointer-events-none"}`}
            onClick={handleLeagueClick}
        >
            {isPendingItem && <ListItemLoading>{league.name}</ListItemLoading>}
            <LeagueHeader {...{ avatar, name, rank }} />
            <LeagueDetails {...{ teamValue, budget, squadCount }} />
        </motion.li>
    );
}

LeagueListItem.propTypes = {
    league: PropTypes.object.isRequired,
    mutateFn: PropTypes.func.isRequired,
    isPendingMutation: PropTypes.bool.isRequired,
    isPendingItem: PropTypes.bool.isRequired,
};

export default LeagueListItem;
