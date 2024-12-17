import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSubmit } from "react-router-dom";
import { removeLeague } from "../../../store/league-slice";
import { removeMatchday } from "../../../store/matchday-slice";
import { useIsFetching } from "@tanstack/react-query";
import ProgressBar from "../../05_atoms/ProgressBar";
import { startTransition } from "react";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./UserNav.Styles";
import UserNavInfo from "@/components/04_molecules/Navigation/UserNavInfo";
import UserNavActions from "@/components/04_molecules/Navigation/UserNavActions";

const _ = new TailwindStyleSheet(styles);

export default function UserNav() {
    const isFetching = useIsFetching();
    const submit = useSubmit();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const league = useSelector((state) => state.league);
    const matchday = useSelector((state) => state.matchday);
    const hasLeague = Object.keys(league).length !== 0;
    const hasMatchday = Object.keys(matchday).length !== 0;
    const { day, live: isLive } = matchday;

    function handleLogoutClick() {
        submit(null, { action: "/auth/logout", method: "POST" });
    }

    async function handleChangeMatchdayClick() {
        await dispatch(removeMatchday()).unwrap();
        startTransition(() => {
            navigate(`/leagues/${league.id}/matchdays`);
        });
    }

    async function handleChangeLeagueClick() {
        await dispatch(removeMatchday()).unwrap();
        await dispatch(removeLeague()).unwrap();
        startTransition(() => {
            navigate("/leagues");
        });
    }

    return (
        <div id="smooth-edges-after-b" className={_.wrapper}>
            <ProgressBar isFetching={isFetching > 0} />
            <nav className={_.nav}>
                <UserNavInfo {...{ user, league, hasLeague, hasMatchday, day, isLive }} />
                <UserNavActions
                    {...{
                        handleChangeMatchdayClick,
                        handleChangeLeagueClick,
                        handleLogoutClick,
                        hasLeague,
                        hasMatchday,
                    }}
                />
            </nav>
        </div>
    );
}
