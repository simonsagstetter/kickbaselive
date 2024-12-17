import PropTypes from "prop-types";
import { AwaitImage } from "@/components/05_atoms/Image";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./LeagueHeader.Styles";

const _ = new TailwindStyleSheet(styles);

function LeagueHeader({ avatar, name, rank }) {
    return (
        <div className={_.container}>
            <AwaitImage src={avatar} alt={name} className={_.avatar} fallbackClasses={_.avatarFallback} />
            <div className={_.info}>
                <h1 className={_.infoHeading}>{name}</h1>
                <p className={_.infoText}>Rank #{rank}</p>
            </div>
        </div>
    );
}

LeagueHeader.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
};

export default LeagueHeader;
