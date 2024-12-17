import { number, string } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./TeamDetail.Styles";

const _ = new TailwindStyleSheet(styles);

function TeamDetail({ placement, teamName, abbreviation, index }) {
    const isWinner = index === 0,
        badgeCssClasses = `${_.badge} ${isWinner ? "bg-kbgreen text-kbdark" : "bg-zinc-800 text-zinc-200"}`,
        fullNameCssClasses = `${_.fullName} ${isWinner ? "text-kbgreen" : "text-zinc-200"}`,
        shortNameCssClasses = `${_.shortName} ${isWinner ? "text-kbgreen" : "text-zinc-200"}`;
    return (
        <div className={_.wrapper}>
            <div className={badgeCssClasses}>
                <span className={_.badgeText}>{placement}</span>
            </div>
            <p className={fullNameCssClasses}>{teamName}</p>
            <p className={shortNameCssClasses}>{abbreviation}</p>
        </div>
    );
}

TeamDetail.propTypes = {
    placement: number.isRequired,
    teamName: string.isRequired,
    abbreviation: string.isRequired,
    index: number,
};

export default TeamDetail;
