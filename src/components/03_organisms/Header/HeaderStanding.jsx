import { AwaitImage } from "@/components/05_atoms/Image";
import { bool, string } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./HeaderStanding.Styles";

const _ = new TailwindStyleSheet(styles);

function HeaderStanding({ team1Won, team1Logo, team1Name, team2Won, team2Logo, team2Name, score }) {
    return (
        <div className={_.container}>
            <div className={_.wrapper}>
                <div className={_.leftSection}>
                    {team1Won && (
                        <div className={`${_.winnerWrapper} -left-9`}>
                            <span className={_.winner}>Winner</span>
                        </div>
                    )}
                    <AwaitImage src={team1Logo} alt={team1Name} className={_.image} fallbackClasses={_.imageFallback} />
                    <p className={_.nameLeft}>{team1Name}</p>
                </div>
                <p className={_.score}>{score}</p>
                <div className={_.rightSection}>
                    {team2Won && (
                        <div className={`${_.winnerWrapper} -right-9`}>
                            <span className={_.winner}>Winner</span>
                        </div>
                    )}
                    <p className={_.nameRight}>{team2Name}</p>
                    <AwaitImage src={team2Logo} alt={team2Name} className={_.image} fallbackClasses={_.imageFallback} />
                </div>
            </div>
        </div>
    );
}

export default HeaderStanding;

HeaderStanding.propTypes = {
    team1Won: bool.isRequired,
    team1Logo: string.isRequired,
    team1Name: string.isRequired,
    score: string.isRequired,
    team2Won: bool.isRequired,
    team2Logo: string.isRequired,
    team2Name: string.isRequired,
};
