import { string, number } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import { AwaitImage } from "@/components/05_atoms/Image";
import styles from "./HeaderManager.Styles";

const _ = new TailwindStyleSheet(styles);

function HeaderManager({ badgeText, image }) {
    const isWinner = badgeText === 1;
    return (
        <div className={_.container}>
            <div className={`${_.placementWrapper} ${isWinner && "!bg-kbgreen !text-kbdark"}`}>
                <span className={_.placement}># {badgeText}</span>
            </div>
            <div className={`${_.imageWrapper} ${isWinner && "!border-kbgreen"}`}>
                <AwaitImage src={image} className={_.image} fallbackClasses={_.imageFallback} />
            </div>
        </div>
    );
}

export default HeaderManager;

HeaderManager.propTypes = {
    badgeText: number.isRequired,
    image: string.isRequired,
};
