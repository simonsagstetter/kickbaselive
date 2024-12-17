import { array } from "prop-types";
import MatchListItem from "./MatchListItem";
import { motion } from "framer-motion";
import { list, listItem } from "@/motion/motionConfig";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./MatchList.Styles";

const _ = new TailwindStyleSheet(styles);

function MatchList({ matches }) {
    const map = new Map();

    for (const match of matches) {
        const key = match.matchDateTimeRaw;
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(match);
    }

    const sortedMatches = Array.from(map.values());

    return (
        <motion.ul {...list} id="improved-scrollbar" className={_.wrapper}>
            {sortedMatches.map((matches) => {
                const { matchWeekday, matchTime, matchDateTimeRaw } = matches[0];
                return (
                    <motion.li {...listItem} key={matchDateTimeRaw} className={_.collection}>
                        <h3 className={_.collectionTitle}>
                            {matchWeekday} {matchTime}
                        </h3>
                        <motion.ul {...list} className={_.matches}>
                            {matches.map((match) => (
                                <MatchListItem key={match.matchId} match={match} />
                            ))}
                        </motion.ul>
                    </motion.li>
                );
            })}
        </motion.ul>
    );
}

export default MatchList;

MatchList.propTypes = {
    matches: array.isRequired,
};
