import { string } from "prop-types";
import { AwaitImage } from "@/components/05_atoms/Image";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./TeamCover.Styles";

const _ = new TailwindStyleSheet(styles);

function TeamCover({ teamName, teamLogo }) {
    return (
        <div className={_.wrapper}>
            <div className={_.coverWrapper}>
                <AwaitImage src={teamLogo} alt={teamName} className={_.cover} fallbackClasses={_.coverFallback} />
            </div>
        </div>
    );
}

export default TeamCover;

TeamCover.propTypes = {
    teamName: string.isRequired,
    teamLogo: string.isRequired,
};
