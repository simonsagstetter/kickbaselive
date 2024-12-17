import { object } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./PlayerMatchStatus.Style";

const _ = new TailwindStyleSheet(styles);

function PlayerMatchStatus({ player }) {
    const { matchStarted, matchTimeReadable, playTime, miss, matchRunning } = player;
    const playtime = playTime !== "0" && `'${playTime}`;
    return (
        <div className={_.wrapper}>
            {!matchStarted && matchTimeReadable && <p className={_.time}>{`${matchTimeReadable}`}</p>}
            {matchRunning && !miss && (
                <h2 className={_.heading}>
                    <span className={_.pingWrapper}>
                        <span className={_.ping}></span>
                        <span className={_.pingBackground}></span>
                    </span>
                    <span>Live {playtime}</span>
                </h2>
            )}
        </div>
    );
}

export default PlayerMatchStatus;

PlayerMatchStatus.propTypes = {
    player: object.isRequired,
};
