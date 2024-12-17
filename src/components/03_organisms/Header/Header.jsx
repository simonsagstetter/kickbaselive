import { string, node } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import HeaderTitle from "./HeaderTitle";
import HeaderTeam from "./HeaderTeam";
import HeaderManager from "./HeaderManager";
import HeaderStanding from "./HeaderStanding";
import styles from "./Header.Styles";

const _ = new TailwindStyleSheet(styles);

function Header({ stickyPosClass = "-top-32 max-sm:-top-28", children }) {
    return <div className={`${_.container} ${stickyPosClass}`}>{children}</div>;
}

export default Header;

Header.propTypes = {
    stickyPosClass: string.isRequired,
    children: node.isRequired,
};

Header.Title = HeaderTitle;
Header.Team = HeaderTeam;
Header.Manager = HeaderManager;
Header.Standing = HeaderStanding;
