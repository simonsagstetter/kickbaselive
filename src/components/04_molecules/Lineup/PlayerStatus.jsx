import { number } from "prop-types";
import {
    AwayIcon,
    FitIcon,
    InjuredIcon,
    RedCardIcon,
    RehabIcon,
    StrickenIcon,
    UnknownIcon,
    YellowCardIcon,
} from "@/components/05_atoms/Icons";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./PlayerStatus.Styles";

const _ = new TailwindStyleSheet(styles);

function PlayerStatus({ status }) {
    let content = <UnknownIcon />;
    let bgClass = "bg-zinc-800";

    switch (status) {
        case 0:
            bgClass = "bg-kbgreen";
            content = <FitIcon />;
            break;

        case 1:
            bgClass = "bg-kbred";
            content = <InjuredIcon />;
            break;

        case 2:
            bgClass = "bg-kbgold";
            content = <StrickenIcon />;
            break;

        case 4:
            bgClass = "bg-kborange";
            content = <RehabIcon />;
            break;

        case 8:
            content = <RedCardIcon forBadge />;
            break;

        case 16:
            content = <RedCardIcon forBadge />;
            break;

        case 32:
            content = <YellowCardIcon forBadge />;
            break;

        case 256:
            content = <AwayIcon />;
            break;

        default:
            bgClass = "bg-kbdark";
            content = <UnknownIcon />;
            break;
    }

    return <div className={`${_.wrapper} ${bgClass}`}>{content}</div>;
}

export default PlayerStatus;

PlayerStatus.propTypes = {
    status: number.isRequired,
};
