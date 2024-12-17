import { getDayPointColor, toNumber } from "@/utils/formatters";
import { bool, number } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import { Fragment, memo } from "react";
import styles from "./MatchdayPoints.Styles";

const _ = new TailwindStyleSheet(styles);

const MatchdayPoints = memo(function MatchdayPoints({ dayPoints, points, isLive = false }) {
    const content = isLive ? (
        <Fragment>
            <div className={_.container}>
                <span className={_.dayPointsLive}>LIVE</span>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className={_.container}>
                <span className={_.dayPoints} style={getDayPointColor(dayPoints ?? 0)}>
                    {dayPoints ?? 0}
                </span>
                <span className={_.points}>Total: {toNumber(points ?? 0)}</span>
            </div>
        </Fragment>
    );
    return content;
});

MatchdayPoints.propTypes = {
    dayPoints: number,
    points: number,
    isLive: bool,
};

export default MatchdayPoints;
