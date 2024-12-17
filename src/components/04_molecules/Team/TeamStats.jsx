import { number } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./TeamStats.Styles";

const _ = new TailwindStyleSheet(styles);

function TeamStats({ placement, goalDifference, tablePoints }) {
    return (
        <div className={_.wrapper}>
            <div className={_.statWrapper}>
                <div>{placement}</div>
                <small className={_.statUnit}>PL</small>
            </div>
            <div className={_.statWrapper}>
                <div>{goalDifference}</div>
                <small className={_.statUnit}>GD</small>
            </div>
            <div className={_.statWrapper}>
                <div>{tablePoints}</div>
                <small className={_.statUnit}>P</small>
            </div>
        </div>
    );
}

export default TeamStats;

TeamStats.propTypes = {
    placement: number.isRequired,
    goalDifference: number.isRequired,
    tablePoints: number.isRequired,
};
