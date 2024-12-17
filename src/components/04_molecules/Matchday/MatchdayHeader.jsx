import { string, number } from "prop-types";
import { AwaitImage } from "@/components/05_atoms/Image";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./MatchdayHeader.Styles";
import { memo } from "react";

const _ = new TailwindStyleSheet(styles);

const MatchdayHeader = memo(function MatchdayHeader({ userAvatar, userName, day }) {
    return (
        <>
            <h2 className={_.heading}>{day}</h2>
            <div className={_.avatarWrapper}>
                <AwaitImage src={userAvatar} alt={userName} className={_.avatar} fallbackClasses={_.avatarFallback} />
            </div>
        </>
    );
});

MatchdayHeader.propTypes = {
    userAvatar: string,
    userName: string,
    day: number,
};

export default MatchdayHeader;
