import { toCurrency } from "@/utils/formatters";
import { string, number, bool } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./MatchdayDetails.Styles";
import { Fragment, memo } from "react";

const _ = new TailwindStyleSheet(styles);

const MatchdayDetails = memo(function MatchdayDetails({ userName, dayPlacement, teamValue, isLive = false }) {
    let content = isLive ? (
        <Fragment>
            <div className={_.container}>
                <p className={_.liveUserName}>{userName}</p>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className={_.container}>
                <p className={_.userName}>{userName}</p>
                <div className={_.detailWrapper}>
                    <div className={`${_.detail} ${dayPlacement < 4 && "!bg-kbgold"}`}>
                        <span className={dayPlacement < 4 ? "text-zinc-900" : ""}># {dayPlacement}</span>
                    </div>
                    <div className={_.detail}>
                        <span>{toCurrency(teamValue ?? 0)}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );

    return content;
});

MatchdayDetails.propTypes = {
    userName: string.isRequired,
    dayPlacement: number,
    teamValue: number,
    isLive: bool,
};

export default MatchdayDetails;
