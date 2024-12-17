import { useEffect, useState } from "react";
import { string, number, func } from "prop-types";
import moment from "moment";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./Countdown.Styles";
import Digit from "@/components/04_molecules/UI/Digit";

const _ = new TailwindStyleSheet(styles);
const INTERVAL = 1000;

function formatDuration(duration) {
    return {
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
    };
}

function Countdown({ dateTimeString, size = 6, callbackFn }) {
    const now = moment();
    const then = moment(dateTimeString);
    const diff = moment.duration(then - now);
    const [countdown, setCountdown] = useState(formatDuration(diff));
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        if (!expired) {
            const interval = setInterval(() => {
                const newDuration = moment.duration(diff - INTERVAL);
                if (newDuration < 0) {
                    setCountdown(formatDuration(moment.duration(0)));
                    setExpired(true);
                } else {
                    setCountdown(formatDuration(newDuration));
                }
            }, INTERVAL);
            return () => clearInterval(interval);
        } else {
            if (callbackFn) callbackFn();
        }
    }, [diff, expired, callbackFn]);

    if (countdown) {
        return (
            <div className={_.wrapper}>
                <Digit {...{ size, unitText: "Days", value: countdown.days }} />
                <Digit {...{ size, unitText: "Hours", value: countdown.hours }} />
                <Digit {...{ size, unitText: "Min.", value: countdown.minutes }} />
                <Digit {...{ size, unitText: "Sec.", value: countdown.seconds }} />
            </div>
        );
    }
}

export default Countdown;

Countdown.propTypes = {
    dateTimeString: string.isRequired,
    size: number,
    callbackFn: func,
};
