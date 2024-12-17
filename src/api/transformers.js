import { GAME_EVENTS, DAY_STATUS_EVENTS } from "./constants";
import moment from "moment";

/**
 * Transforms an array of event codes into a structured object representing game events.
 * @param {number[]} e - An array of event codes.
 * @returns {Object} An object representing the count of various game events.
 */
export const transformEventArray = (e = []) => {
    const gameEvents = { ...GAME_EVENTS };
    if (e !== undefined && e.length !== 0) {
        gameEvents.assists = e.filter((eventCode) => eventCode === 1).length ?? 0;
        gameEvents.nogoal = e.filter((eventCode) => eventCode === 2).length ?? 0;
        gameEvents.goals = e.filter((eventCode) => eventCode === 3).length ?? 0;
        gameEvents.penalty = e.filter((eventCode) => eventCode === 7).length ?? 0;

        if (e.includes(6)) {
            gameEvents.redCard = 1;
        } else if (e.includes(4) && e.includes(5)) {
            gameEvents.yellowRedCard = 1;
        } else if (e.includes(4)) {
            gameEvents.yellowCard = 1;
        }
    }

    return gameEvents;
};

/**
 * Transforms day status and event codes into a structured object representing day status events.
 * @param {number} dayStatus - The status of the day.
 * @param {number[]} e - An array of event codes.
 * @returns {Object} An object representing the day status events.
 */
export const transformDayStatus = (dayStatus, e = []) => {
    const dayStatusEvents = { ...DAY_STATUS_EVENTS };

    if (dayStatus === 5 && !e.includes(8) && !e.includes(9)) {
        dayStatusEvents.full = true;
    } else if (dayStatus === 5 && !e.includes(8) && e.includes(9)) {
        dayStatusEvents.s11 = true;
    } else if (dayStatus === 3 && e.includes(8) && !e.includes(9)) {
        dayStatusEvents.sub = true;
    } else if (dayStatus === 3 && !e.includes(8) && !e.includes(9)) {
        dayStatusEvents.bench = true;
    } else if (dayStatus !== 3 && dayStatus !== 5) {
        dayStatusEvents.miss = true;
    }

    return dayStatusEvents;
};

/**
 * Transforms match status code into a structured object representing match status.
 * @param {number} matchStatus - The status code of the match.
 * @returns {Object} An object representing the match status.
 */
export const transformMatchStatus = (matchStatus) => {
    return {
        matchStarted: matchStatus !== 0,
        matchFinished: matchStatus === 2,
        matchRunning: matchStatus === 1 || matchStatus === 8,
    };
};

/**
 * Transforms a datetime string into a structured object with formatted date and time information.
 * @param {string} datetimeString - The datetime string to transform.
 * @returns {Object} An object containing formatted date and time information.
 */
export const transformStartTime = (datetimeString) => {
    const datetime = moment(datetimeString);
    const now = moment();
    const until = moment.duration(datetime - now);
    const matchWeekday = datetime.format("dddd");
    const matchTime = datetime.format("HH:mm");
    const humanizedMatchTime =
        now.format("dddd") === matchWeekday ? `Today ${matchTime}` : `${matchWeekday} ${matchTime}`;
    return {
        matchDateTimeRaw: datetimeString,
        matchDate: datetime.format("DD.MM.YYYY"),
        matchTime,
        matchWeekday,
        matchTimeHumanized: until.humanize(true),
        matchTimeReadable: humanizedMatchTime,
    };
};
