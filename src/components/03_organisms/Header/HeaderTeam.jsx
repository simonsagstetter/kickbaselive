import { number, string } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import { AwaitImage } from "@/components/05_atoms/Image";
import styles from "./HeaderTeam.Styles";

const _ = new TailwindStyleSheet(styles);

function HeaderTeam({ placement = 0, teamLogo }) {
    const addWinnerClasses = placement === 1 ? "!bg-kbgreen !text-kbdark" : "";
    return (
        <div className={_.container}>
            <div className={`${_.placementWrapper} ${addWinnerClasses}`}>
                <span className={_.placement}># {placement}</span>
            </div>
            <div className={_.imageWrapper}>
                <AwaitImage src={teamLogo} fallbackClasses={_.imageFallback} />
            </div>
        </div>
    );
}

export default HeaderTeam;

HeaderTeam.propTypes = {
    placement: number.isRequired,
    teamLogo: string.isRequired,
};
