import { object, func, bool } from "prop-types";
import { useSelector } from "react-redux";
import Countdown from "../UI/Countdown";
import MatchdayHeader from "@/components/04_molecules/Matchday/MatchdayHeader";
import ListItemLoading from "@/components/04_molecules/UI/ListItemLoading";
import { queryClient } from "@/query/queryClient";
import { motion } from "framer-motion";
import { listItemNegative, listItemHover } from "@/motion/motionConfig";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./MatchdayListItem.Styles";
import MatchdayDetails from "@/components/04_molecules/Matchday/MatchdayDetails";
import MatchdayPoints from "@/components/04_molecules/Matchday/MatchdayPoints";
import { useCallback } from "react";

const _ = new TailwindStyleSheet(styles);

function LivedayListItem({ matchday, liveIsAvailable, mutate, refetch, isPendingMutation, isPendingItem }) {
    const matchdayStartTime = useSelector((state) => state.league.matchdayStartTime);
    const leaguedId = useSelector((state) => state.league.id);
    const userId = useSelector((state) => state.auth.user.id);

    const { userAvatar, userName, day } = matchday;

    async function handleMatchdayClick() {
        if (!liveIsAvailable) {
            return;
        }
        mutate({ matchday: { day: matchday.day, live: true } });
    }

    const invalidateMatchdayData = useCallback(async () => {
        await queryClient.invalidateQueries({
            queryKey: ["matchday", userId, leaguedId],
            refetchType: "all",
        });
        await refetch();
    }, [userId, leaguedId, refetch]);

    return (
        <motion.li
            {...listItemNegative}
            {...listItemHover}
            exit={{
                opacity: 0,
            }}
            onClick={handleMatchdayClick}
            className={`${_.matchdayItem} ${_.live} ${
                liveIsAvailable ? "hover:cursor-pointer hover:border-zinc-600" : "hover:cursor-wait"
            } ${isPendingMutation && "pointer-events-none"}`}
        >
            {isPendingItem && <ListItemLoading>matchday {matchday.day}</ListItemLoading>}
            <div className={_.matchdayBody}>
                <MatchdayHeader {...{ userAvatar, userName, day }} />
                {!liveIsAvailable ? (
                    <Countdown dateTimeString={matchdayStartTime} size={2} callbackFn={invalidateMatchdayData} />
                ) : (
                    <>
                        <MatchdayDetails userName={userName} isLive />
                        <MatchdayPoints isLive />
                    </>
                )}
            </div>
        </motion.li>
    );
}

LivedayListItem.propTypes = {
    matchday: object.isRequired,
    liveIsAvailable: bool.isRequired,
    mutate: func.isRequired,
    refetch: func.isRequired,
    isPendingMutation: bool.isRequired,
    isPendingItem: bool,
};

export default LivedayListItem;
