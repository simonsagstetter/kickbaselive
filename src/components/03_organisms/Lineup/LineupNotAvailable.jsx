import { string } from "prop-types";
import Countdown from "../UI/Countdown";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./LineupNotAvailable.Styles";

const _ = new TailwindStyleSheet(styles);

function LineupNotAvailable({ matchDateTimeRaw }) {
    return (
        <div className={_.container}>
            <div className={_.wrapper}>
                <h2 className={_.heading}>Match did not start yet. Lineup will be available in:</h2>
                <Countdown dateTimeString={`${matchDateTimeRaw}`} />
            </div>
        </div>
    );
}

export default LineupNotAvailable;

LineupNotAvailable.propTypes = {
    matchDateTimeRaw: string.isRequired,
};
