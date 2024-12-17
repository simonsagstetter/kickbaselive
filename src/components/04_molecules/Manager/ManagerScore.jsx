import { string, bool, number } from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { popValue } from "@/motion/motionConfig";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet({
    scoreWrapper: {
        layout: "flex flex-col items-end self-end",
        spacing: "ml-auto ",
    },
    points: {
        typo: "font-medium text-4xl leading-9",
        responsive: {
            sm: {
                typo: "max-sm:text-3xl",
            },
        },
    },
    earnings: {
        typo: "text-sm text-zinc-400 font-medium leading-3",
        spacing: "mb-1",
        responsive: {
            sm: {
                typo: "max-sm:text-xs",
            },
        },
    },
});

function ManagerScore({ isWinner, dayPoints, dayEarnings }) {
    return (
        <div id="points" className={_.scoreWrapper}>
            <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                    key={dayPoints}
                    {...popValue}
                    className={`${_.points} ${isWinner ? "text-kbgreen" : "text-kborange"}`}
                >
                    {dayPoints}
                </motion.span>
                <motion.span
                    key={dayEarnings}
                    animate={{
                        opacity: [0, 1],
                    }}
                    transition={{ type: "spring", duration: 1, delay: 0.2 }}
                    className={_.earnings}
                >
                    {dayEarnings}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export default ManagerScore;

ManagerScore.propTypes = {
    isWinner: bool.isRequired,
    dayPoints: number.isRequired,
    dayEarnings: string.isRequired,
};
