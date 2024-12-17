import PropTypes from "prop-types";
import { toCurrency } from "@/utils/formatters";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./LeagueDetails.Styles";

const _ = new TailwindStyleSheet(styles);

function LeagueDetails({ teamValue, budget, squadCount }) {
    return (
        <div className={_.container}>
            <div className={`${_.detail} items-start text-left`}>
                <p className="font-semibold">{toCurrency(teamValue)}</p>
                <p>Team Value</p>
            </div>
            <div className={_.divider}></div>
            <div className={`${_.detail} items-center`}>
                <p className="font-semibold">{toCurrency(budget)}</p>
                <p>Budget</p>
            </div>
            <div className={_.divider}></div>
            <div className={`${_.detail} items-end`}>
                <p className="font-semibold">{squadCount} / 11</p>
                <p>Lineup</p>
            </div>
        </div>
    );
}

LeagueDetails.propTypes = {
    teamValue: PropTypes.number.isRequired,
    budget: PropTypes.number.isRequired,
    squadCount: PropTypes.number.isRequired,
};

export default LeagueDetails;
