import { toCurrency, toEarnings, getColor } from "@/utils/formatters";
import { playerPositions as positions, playerStatus } from "./constants";
import { transformDayStatus, transformEventArray, transformMatchStatus, transformStartTime } from "./transformers";
import Kickbase from "./env";

/**
 * Adapter class for transforming data.
 */
export class Adapter {
    static values;

    /**
     * Initializes the adapter with origin data.
     * @param {Object} originData - The original data to be adapted.
     * @returns {Adapter} The Adapter class itself for chaining.
     */
    static from(originData) {
        this.values = originData;
        return this;
    }

    /**
     * Maps the stored values using a provided function.
     * @param {Function} mapperFn - The function to map each value.
     * @returns {Array} The array of mapped values.
     */
    static toArray(mapperFn) {
        return this.values.map(mapperFn);
    }

    /**
     * Transforms the stored values using a provided function.
     * @param {Function} mapperFn - The function to transform the values.
     * @returns {*} The result of the transformation.
     */
    static to(mapperFn) {
        return mapperFn(this.values);
    }
}

/**
 * Base class for creating data adapters.
 */
export class BaseAdapter {
    /**
     * Constructs a BaseAdapter instance.
     * @param {Object} obj - The object to adapt.
     */
    constructor(obj) {
        this.value = obj;
    }

    /**
     * Adapts the object to a new format.
     * @returns {Object} The adapted object.
     */
    adapt() {
        return {};
    }
}

/**
 * Adapter for league data.
 */
export class LeagueAdapter extends BaseAdapter {
    /**
     * Adapts league data to a specific format.
     * @returns {Object} The adapted league data.
     */
    adapt() {
        const {
            i: id,
            n: name,
            f: avatar,
            pl: rank = "0",
            tv: teamValue,
            b: budget,
            lpc: squadCount,
            cpi: competitionId,
        } = this.value;

        return {
            id,
            name,
            avatar,
            rank,
            teamValue,
            budget,
            squadCount,
            competitionId,
        };
    }
}

/**
 * Adapter for matchday data.
 */
export class MatchdayAdapter extends BaseAdapter {
    /**
     * Adapts matchday data to a specific format.
     * @param {Object} user - The user information.
     * @param {string} user.name - The user's name.
     * @param {string} user.profile - The user's profile image.
     * @returns {Object} The adapted matchday data.
     */
    adapt({ name: userName, profile: userAvatar }) {
        const { day, mdp: dayPoints, sp: points, tv: teamValue, mdpl: dayPlacement } = this.value;

        return {
            day,
            dayPoints,
            points,
            teamValue,
            dayPlacement,
            userName,
            userAvatar,
        };
    }
}

/**
 * Adapter for match data.
 */
export class MatchAdapter extends BaseAdapter {
    /**
     * Adapts match data to a specific format.
     * @returns {Object} The adapted match data.
     */
    adapt() {
        const {
            md: matchDateTimeRaw,
            day: matchday,
            mi: matchId,
            t1: team1Id,
            t1im: team1Image,
            t2: team2Id,
            t2im: team2image,
            t1sy: team1Sym,
            t2sy: team2Sym,
            t1n: team1Name,
            t2n: team2Name,
            t1g: team1goals,
            t2g: team2goals,
        } = this.value;

        const status = this.value.st || this.value.mst;
        return {
            matchId,
            matchday,
            ...transformStartTime(matchDateTimeRaw),
            ...transformMatchStatus(status),
            team1: {
                id: team1Id,
                name: team1Name,
                abbreviation: team1Sym,
                goals: team1goals,
                logo: Kickbase.getCDNUrl() + team1Image,
            },
            team2: {
                id: team2Id,
                name: team2Name,
                abbreviation: team2Sym,
                goals: team2goals,
                logo: Kickbase.getCDNUrl() + team2image,
            },
        };
    }
}

/**
 * Adapter for manager data.
 */
export class ManagerAdapter extends BaseAdapter {
    /**
     * Adapts manager data to a specific format.
     * @returns {Object} The adapted manager data.
     */
    adapt() {
        const {
            i: userId,
            n: userName,
            day,
            nextDay,
            season,
            mdp: dayPoints,
            mdpl: dayPlacement,
            lp: lineupPlayers,
            uim: userImage,
        } = this.value;

        return {
            userName,
            userId,
            day,
            nextDay,
            season,
            lineupPlayers,
            userAvatar: Kickbase.getCDNUrl() + userImage,
            dayPoints: dayPoints || 0,
            dayPlacement: dayPlacement || 0,
            dayEarnings: toEarnings(dayPoints || 0),
        };
    }
}

/**
 * Adapter for player data.
 */
export class PlayerAdapter extends BaseAdapter {
    /**
     * Adapts player data to a specific format.
     * @returns {Object} The adapted player data.
     */
    adapt() {
        const {
            p: dayPoints,
            day: matchDay,
            st: dayStatus,
            lineup,
            md: matchDate,
            mst: matchStatus,
        } = this.value.points;

        const {
            i: playerId,
            tid: teamId,
            pos: position,
            fn: firstName,
            ln: lastName,
            shn: number,
            st: status,
            pim: playerImage,
            tim: teamImage,
        } = this.value.profile;
        const dayPointsColorObject = getColor(dayPoints);
        const eventArray = this.value.points?.k ?? [];
        const playTime = this.value.points.mp || this.value.points.mt;

        return {
            playerId,
            teamId,
            firstName,
            lastName,
            number,
            position,
            positionText: positions.get(position) || "RES",
            playerCover: Kickbase.getCDNUrl() + playerImage,
            teamCover: Kickbase.getCDNUrl() + teamImage,
            status,
            statusText: playerStatus.get(status) || "Fit",
            dayPoints: dayPoints || 0,
            dayEarnings: toEarnings(dayPoints ?? 0),
            dayPointsColorObject,
            dayPointsColor: dayPointsColorObject.color,
            matchDay,
            playTime,
            lineup,
            ...transformEventArray(eventArray),
            ...transformDayStatus(dayStatus, eventArray),
            ...transformStartTime(matchDate),
            ...transformMatchStatus(matchStatus),
        };
    }
}

/**
 * Adapter for team data.
 */
export class TeamAdapter extends BaseAdapter {
    /**
     * Adapts team data to a specific format.
     * @param {Object} abbreviations - A map of team IDs to their abbreviations.
     * @returns {Object} The adapted team data.
     */
    adapt(abbreviations) {
        const {
            tid: teamId,
            tn: teamName,
            mi: lastMatchId,
            cpl: placement,
            cp: tablePoints,
            gd: goalDifference,
            sp: scorePoints,
            tim: teamImage,
        } = this.value;

        return {
            teamId,
            teamName,
            lastMatchId,
            placement,
            tablePoints,
            goalDifference,
            scorePoints,
            earnings: toEarnings(scorePoints),
            abbreviation: abbreviations[teamId] || "",
            teamLogo: Kickbase.getCDNUrl() + teamImage,
        };
    }
}

/**
 * Adapter for team player data.
 */
export class TeamPlayerAdapter extends BaseAdapter {
    /**
     * Adapts team player data to a specific format.
     * @returns {Object} The adapted team player data.
     */
    adapt() {
        const {
            i: playerId,
            tid: teamId,
            fn: firstName,
            ln: lastName,
            ap: averagePoints,
            tp: totalPoints,
            st: status,
            stxt: statusText,
            pos: position,
            mv: marketValue,
            pim: playerImage,
            tim: teamImage,
        } = this.value;

        return {
            playerId,
            teamId,
            firstName,
            lastName,
            number: this.value.shn,
            position,
            positionText: positions.get(position) || "RES",
            playerCover: Kickbase.getCDNUrl() + playerImage,
            teamCover: Kickbase.getCDNUrl() + teamImage,
            status,
            statusText,
            marketValue,
            marketValueFormatted: toCurrency(marketValue),
            totalPoints: totalPoints || 0,
            totalEarnings: toEarnings(totalPoints || 0),
            averagePoints: averagePoints || 0,
        };
    }
}
