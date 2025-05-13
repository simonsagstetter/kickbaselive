import { useSelector } from "react-redux";
import MatchdayListItem from "./MatchdayListItem";
import LivedayListItem from "./LivedayListItem";
import { AnimatePresence, motion } from "framer-motion";
import { list } from "@/motion/motionConfig";
import moment from "moment";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./MatchdayList.Styles";
import { useMemo } from "react";
import PropTypes from "prop-types";

const _ = new TailwindStyleSheet(styles);

function MatchdayList({ matchdays, mutateFn, refetchFn, isPendingMutation, pendingItem }) {
    const { currentDay, matchdayStartTime, matchdayEndTime, seasonEnd } = useSelector((state) => state.league);
    const { liveMatchday, pastMatchdays } = useMemo(
        () =>
            matchdays.reduce(
                (result, matchday) => {
                    if (
                        (matchday.day === currentDay && !seasonEnd) ||
                        (matchday.day === currentDay && seasonEnd && matchday.day === 34)
                    ) {
                        result.liveMatchday = { ...matchday, live: true };
                    } else {
                        result.pastMatchdays.push(matchday);
                    }
                    return result;
                },
                { liveMatchday: undefined, pastMatchdays: [] }
            ),
        [matchdays, currentDay, seasonEnd]
    );
    const now = moment();
    const liveIsAvailable = moment(matchdayStartTime) < now && moment(matchdayEndTime) > now;

    return (
        <div className={_.matchdaysContainer}>
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", duration: 2 }}
                className={_.matchdaysHeading}
            >
                Choose a matchday
            </motion.h1>
            <AnimatePresence mode="wait">
                {matchdays.length > 0 && (
                    <motion.ul {...list} className={_.matchdaysList}>
                        {((!seasonEnd && liveMatchday !== undefined) ||
                            (seasonEnd && liveMatchday !== undefined && currentDay == 34)) && (
                            <LivedayListItem
                                key={liveMatchday.day}
                                matchday={liveMatchday}
                                liveIsAvailable={liveIsAvailable}
                                mutate={mutateFn}
                                refetch={refetchFn}
                                isPendingMutation={isPendingMutation}
                                isPendingItem={liveMatchday.day === pendingItem}
                            />
                        )}
                        {pastMatchdays.map((matchday) => (
                            <MatchdayListItem
                                key={matchday.day}
                                matchday={matchday}
                                mutate={mutateFn}
                                isPendingMutation={isPendingMutation}
                                isPendingItem={matchday.day === pendingItem}
                            />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

MatchdayList.propTypes = {
    matchdays: PropTypes.array.isRequired,
    mutateFn: PropTypes.func.isRequired,
    refetchFn: PropTypes.func.isRequired,
    isPendingMutation: PropTypes.bool.isRequired,
    pendingItem: PropTypes.number,
};

export default MatchdayList;
