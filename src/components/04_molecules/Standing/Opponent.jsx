import { bool, string } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import { Link } from "react-router-dom";
import { AwaitImage } from "@/components/05_atoms/Image";
import { Fragment, Children } from "react";
import styles from "./Opponent.Styles";

const _ = new TailwindStyleSheet(styles);

function Opponent({ isSecond = false, matchId, id, logo, name, abbreviation }) {
    const linkCssClasses = `${_.link} ${isSecond ? "justify-end" : ""}`;
    const content = (
        <Fragment>
            <AwaitImage src={logo} alt={name} className={_.cover} fallbackClasses={_.coverFallback} />
            <p className={_.name}>{name}</p>
            <p className={_.abbreviation}>{abbreviation}</p>
        </Fragment>
    );

    return (
        <Link to={`${matchId}/team/${id}`} className={linkCssClasses}>
            {isSecond ? Children.toArray(content.props.children).reverse() : content}
        </Link>
    );
}

export default Opponent;

Opponent.propTypes = {
    isSecond: bool,
    matchId: string.isRequired,
    id: string.isRequired,
    logo: string.isRequired,
    name: string.isRequired,
    abbreviation: string.isRequired,
};
