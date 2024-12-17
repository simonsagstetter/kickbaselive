import { bool, object, string } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./Score.Styles";
import { AnimatePresence, motion } from "framer-motion";
import { popValue, touchOrange } from "@/motion/motionConfig";

const _ = new TailwindStyleSheet(styles);

function Score({ matchStarted, matchRunning, matchTimeHumanized, team1, team2 }) {
    return (
        <div className={_.wrapper}>
            {matchStarted && (
                <div className={_.score}>
                    <div className={_.scoreWrapper}>
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                                key={`${team1.id}:${team1.goals}`}
                                {...popValue}
                                animate={{
                                    ...popValue.animate,
                                    ...touchOrange.animate,
                                }}
                            >
                                {team1.goals}
                            </motion.span>
                            <span>:</span>
                            <motion.span
                                key={`${team2.id}:${team2.goals}`}
                                {...popValue}
                                animate={{
                                    ...popValue.animate,
                                    ...touchOrange.animate,
                                }}
                            >
                                {team2.goals}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    {matchRunning && (
                        <small className={_.live}>
                            <span className={_.pingWrapper}>
                                <span className={_.pingBackground}></span>
                                <span className={_.ping}></span>
                            </span>
                            Live
                        </small>
                    )}
                </div>
            )}
            {!matchStarted && (
                <p className={_.scoreNA}>
                    <span className={_.scorePlaceholder}>- : -</span>
                    <small className={_.matchTime}>{matchTimeHumanized}</small>
                </p>
            )}
        </div>
    );
}

Score.propTypes = {
    matchStarted: bool,
    matchRunning: bool,
    matchTimeHumanized: string,
    team1: object.isRequired,
    team2: object.isRequired,
};

export default Score;
