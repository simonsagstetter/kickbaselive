import { bool, number, object } from "prop-types";
import { AwaitImage } from "@/components/05_atoms/Image";
import PlayerStatus from "./PlayerStatus";
import PlayerBadge from "@/components/05_atoms/Lineup/PlayerBadge";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./PlayerCover.Styles";

const _ = new TailwindStyleSheet(styles);

function PlayerCover({ rankingMode = false, index, player }) {
    const { lastName, playerCover, status, miss, matchRunning } = player,
        isWinner = index === 0,
        coverWrapperClasses = `${_.coverWrapper} ${isWinner && "border-2 border-kbgreen"}`;

    return (
        <div className={_.wrapper}>
            {rankingMode ? <PlayerBadge index={index} /> : <PlayerStatus status={status} />}
            <div className={coverWrapperClasses}>
                <AwaitImage src={playerCover} alt={lastName} className={_.cover} fallbackClasses={_.coverFallback} />
            </div>
            {matchRunning && !miss && <div className={_.status}></div>}
        </div>
    );
}

export default PlayerCover;

PlayerCover.propTypes = {
    rankingMode: bool,
    index: number,
    player: object.isRequired,
};
