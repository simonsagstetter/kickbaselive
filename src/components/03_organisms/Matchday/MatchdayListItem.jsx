import { object, func, bool } from "prop-types";
import MatchdayHeader from "@/components/04_molecules/Matchday/MatchdayHeader";
import MatchdayDetails from "@/components/04_molecules/Matchday/MatchdayDetails";
import ListItemLoading from "@/components/04_molecules/UI/ListItemLoading";
import { motion } from "framer-motion";
import { listItem, listItemHover } from "@/motion/motionConfig";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./MatchdayListItem.Styles";
import MatchdayPoints from "@/components/04_molecules/Matchday/MatchdayPoints";

const _ = new TailwindStyleSheet(styles);

function MatchdayListItem({ matchday, mutate, isPendingMutation, isPendingItem }) {
    const { userAvatar, userName, day, dayPlacement, teamValue, dayPoints, points } = matchday;
    function handleMatchdayClick() {
        mutate({
            matchday: {
                ...matchday,
                live: false,
            },
        });
    }
    return (
        <motion.li
            {...listItem}
            {...listItemHover}
            onClick={handleMatchdayClick}
            className={`${_.matchdayItem} ${_.past} ${isPendingMutation && "pointer-events-none"}`}
        >
            {isPendingItem && <ListItemLoading>matchday {matchday.day}</ListItemLoading>}
            <div className={_.matchdayBody}>
                <MatchdayHeader key={"header"} {...{ userAvatar, userName, day }} />
                <MatchdayDetails key={"details"} {...{ userName, dayPlacement, teamValue }} />
                <MatchdayPoints key={"points"} {...{ dayPoints, points }} />
            </div>
        </motion.li>
    );
}

MatchdayListItem.propTypes = {
    matchday: object.isRequired,
    mutate: func.isRequired,
    isPendingMutation: bool.isRequired,
    isPendingItem: bool,
};

export default MatchdayListItem;
