import { bool, number, object } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./PlayerPoints.Styles";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInValue, popValue } from "@/motion/motionConfig";

const _ = new TailwindStyleSheet(styles);

function PlayerPoints({ player, isLive = false, showTotals = false, index }) {
    let content;
    const wrapperCssClasses = `${_.wrapper} ${isLive ? "basis-3/12 max-sm:basis-4/12" : "basis-4/12"}`,
        isWinner = index === 0,
        dayPointsColorObject = showTotals ? {} : player.dayPointsColorObject,
        pointsCssClasses = showTotals ? `${_.points} ${isWinner ? "text-kbgreen" : "text-kborange"}` : _.points,
        dayPoints = showTotals ? player.totalPoints : player.dayPoints,
        dayEarnings = showTotals ? player.totalEarnings : player.dayEarnings;

    if (isLive) {
        content = (
            <AnimatePresence initial={false} mode="popLayout">
                <motion.span key={player.dayPoints} {...popValue} style={dayPointsColorObject} className={_.points}>
                    {dayPoints}
                </motion.span>
                <motion.span key={player.dayEarnings} {...fadeInValue} className={_.earnings}>
                    {dayEarnings}
                </motion.span>
            </AnimatePresence>
        );
    } else {
        content = (
            <>
                <span style={dayPointsColorObject} className={pointsCssClasses}>
                    {dayPoints}
                </span>
                <span className={_.earnings}>{dayEarnings}</span>
            </>
        );
    }

    return <div className={wrapperCssClasses}>{content}</div>;
}

export default PlayerPoints;

PlayerPoints.propTypes = {
    player: object.isRequired,
    isLive: bool,
    showTotals: bool,
    index: number,
};
