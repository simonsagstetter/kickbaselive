import { bool, number, object } from "prop-types";
import { AwaitImage } from "@/components/05_atoms/Image";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./UserNavInfo.Styles";

const _ = new TailwindStyleSheet(styles);

function UserNavInfo({ user, league, hasLeague, hasMatchday, day, isLive }) {
    const { profile, name: userName } = user,
        { avatar, name: leagueName } = league,
        userAvatarCssClasses = `${_.coverWrapper} z-10`,
        leagueAvatarCssClasses = `${_.coverWrapper} -ml-9`;

    return (
        <div className={_.wrapper}>
            <div className={userAvatarCssClasses}>
                <AwaitImage src={profile} alt={userName} className={_.cover} fallbackClasses={_.cover} />
            </div>
            {hasLeague && (
                <div className={leagueAvatarCssClasses}>
                    <AwaitImage src={avatar} alt={leagueName} className={_.cover} fallbackClasses={_.cover} />
                </div>
            )}
            <div className={_.infoWrapper}>
                <h1 className={_.userName}>{userName}</h1>
                {hasLeague && <span className={_.leagueName}>{leagueName}</span>}
            </div>
            {hasMatchday && (
                <div className={_.matchday}>
                    {day}
                    {isLive && (
                        <span className={_.pingWrapper}>
                            <span className={_.ping}></span>
                            <span className={_.pingBackground}></span>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserNavInfo;

UserNavInfo.propTypes = {
    user: object.isRequired,
    league: object.isRequired,
    hasLeague: bool.isRequired,
    hasMatchday: bool.isRequired,
    day: number,
    isLive: bool,
};
