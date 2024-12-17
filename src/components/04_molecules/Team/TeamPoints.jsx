import { number, string } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./TeamPoints.Styles";

const _ = new TailwindStyleSheet(styles);

function TeamPoints({ scorePoints, earnings, index }) {
    const isWinner = index === 0,
        scorePointsCssClasses = `${_.scorePoints} ${isWinner ? "!text-kbgreen" : ""}`;
    return (
        <div className={_.wrapper}>
            <span className={scorePointsCssClasses}>{scorePoints}</span>
            <span className={_.earnings}>{earnings}</span>
        </div>
    );
}

export default TeamPoints;

TeamPoints.propTypes = {
    scorePoints: number.isRequired,
    earnings: string.isRequired,
    index: number,
};
