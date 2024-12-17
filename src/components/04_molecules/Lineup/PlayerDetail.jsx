import { bool, number, object } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./PlayerDetail.Styles";
import { AwaitImage } from "@/components/05_atoms/Image";
import {
    BenchIcon,
    FormationIcon,
    MissIcon,
    RedCardIcon,
    S11Icons,
    SubIcons,
    YellowCardIcon,
    YellowRedCardIcon,
} from "@/components/05_atoms/Icons";
import PlayerAssists from "@/components/05_atoms/Lineup/PlayerAssists";
import PlayerGoals from "@/components/05_atoms/Lineup/PlayerGoals";
import { Fragment } from "react";

const _ = new TailwindStyleSheet(styles);

const DEFAULT_OPTIONS = {
    showTeamCover: true,
    showNumber: true,
    showPosition: true,
    showPlaytime: true,
    showMatchtime: true,
    showAverage: false,
    showStatus: true,
    showEvents: true,
};

function PlayerDetail({ player, isLive = false, index, options }) {
    const { firstName, lastName, teamCover, teamId, number: no, positionText, assists, goals, averagePoints } = player,
        matchTime = `${player?.matchTimeReadable ?? ""}`,
        playTime = `${player?.playTime ?? 0}`,
        isWinner = index === 0,
        wrapperClasses = `${_.wrapper} ${isLive ? "basis-6/12 max-sm:basis-7/12" : "basis-7/12"}`,
        firstNameClasses = `${_.firstName} ${isWinner && "text-kbgreen"}`,
        lastNameClasses = `${_.lastName} ${isWinner && "text-kbgreen"}`,
        attributesClasses = `${_.attributes} ${isLive ? "max-sm:-ml-1" : ""}`,
        addCoverClasses = isLive ? "max-sm:hidden" : "max-sm:-mr-1 max-sm:-ml-1",
        coverClasses = `${_.cover} ${addCoverClasses}`,
        coverFallbackClasses = `${_.coverFallback} ${addCoverClasses}`,
        attributes = { ...DEFAULT_OPTIONS, ...options };

    return (
        <div className={wrapperClasses}>
            <p className={firstNameClasses}>{firstName}</p>
            <p className={lastNameClasses}>{lastName}</p>
            <div className={attributesClasses}>
                {attributes.showTeamCover && (
                    <AwaitImage
                        src={teamCover}
                        alt={teamId}
                        className={coverClasses}
                        fallbackClasses={coverFallbackClasses}
                    />
                )}
                {attributes.showNumber && <p className={_.badge}>{no}</p>}
                {attributes.showPosition && <p className={_.badge}>{positionText}</p>}
                {attributes.showPlaytime && !isLive && <p className={`${_.badgeBase} max-sm:text-xxs`}>{playTime}</p>}
                {attributes.showMatchtime && isLive && !player.matchStarted && (
                    <div className={_.matchTimeWrapper}>
                        <p className={_.matchTime}>{matchTime}</p>
                    </div>
                )}
                {attributes.showAverage && (
                    <div className={`${_.badgeBase} max-sm:text-xxs`}>
                        <span>&#8709; {averagePoints}</span>
                    </div>
                )}
                {attributes.showStatus && (
                    <Fragment>
                        {player.full && <FormationIcon />}
                        {player.s11 && <S11Icons />}
                        {player.sub && <SubIcons />}
                        {player.bench && <BenchIcon />}
                        {player.matchStarted && player.miss && <MissIcon />}
                    </Fragment>
                )}
                {attributes.showEvents && (
                    <Fragment>
                        {player.yellowCard > 0 && <YellowCardIcon />}
                        {player.yellowRedCard > 0 && <YellowRedCardIcon />}
                        {player.redCard > 0 && <RedCardIcon />}
                        {assists > 0 && <PlayerAssists amount={assists} />}
                        {goals > 0 && <PlayerGoals amount={goals} />}
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default PlayerDetail;

PlayerDetail.propTypes = {
    player: object.isRequired,
    isLive: bool,
    index: number,
    options: object,
};
