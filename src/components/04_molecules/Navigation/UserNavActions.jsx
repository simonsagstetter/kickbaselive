import { bool, func } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./UserNavActions.Styles";
import Button, { ButtonInset } from "@/components/05_atoms/Button";
import { LogoutIcon, SwitchIcon } from "@/components/05_atoms/Icons";

const _ = new TailwindStyleSheet(styles);

function UserNavActions({
    handleChangeMatchdayClick,
    handleChangeLeagueClick,
    handleLogoutClick,
    hasLeague,
    hasMatchday,
}) {
    return (
        <div className={_.wrapper}>
            {hasMatchday && (
                <Button type="button" onClick={handleChangeMatchdayClick}>
                    <SwitchIcon />
                    <span className={_.text}>Matchday</span>
                </Button>
            )}
            {hasLeague && !hasMatchday && (
                <Button type="button" onClick={handleChangeLeagueClick}>
                    <SwitchIcon />
                    <span className={_.text}>League</span>
                </Button>
            )}
            <ButtonInset type="button" onClick={handleLogoutClick}>
                <LogoutIcon />
                <span className={_.text}>Logout</span>
            </ButtonInset>
        </div>
    );
}

export default UserNavActions;

UserNavActions.propTypes = {
    handleChangeMatchdayClick: func.isRequired,
    handleChangeLeagueClick: func.isRequired,
    handleLogoutClick: func.isRequired,
    hasLeague: bool.isRequired,
    hasMatchday: bool.isRequired,
};
