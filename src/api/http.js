import moment from "moment";
import { DEFAULT_POINTS } from "./constants";
import { zerosLast } from "@/utils/array";
import { getMatchDetails } from "./matches";
import {
    getLeagueSelection,
    getRanking,
    getUserLineup,
    getPlayerProfile as getLeaguePlayerProfile,
    getPlayerPerformance as getLeaguePlayerPerformance,
} from "./leagues";
import {
    Adapter,
    LeagueAdapter,
    ManagerAdapter,
    MatchAdapter,
    MatchdayAdapter,
    PlayerAdapter,
    TeamAdapter,
    TeamPlayerAdapter,
} from "./adapters";
import {
    getMatchdays,
    getTeamLineup,
    getTeamProfile,
    getPlayerProfile as getCompetitionPlayerProfile,
    getPlayerPerformance as getCompetitionPlayerPerformance,
    getTeams,
    getTopPlayers,
    getPlayerEvents,
} from "./competitions";

/**
 * API class to handle setup and fetch operations.
 */
export class API {
    static #requestConfig;
    static #method = {
        GET: "GET",
        POST: "POST",
    };

    /**
     * Sets up the API request configuration.
     * @param {Object} config - Configuration object.
     * @param {AbortSignal} config.signal - Signal to abort the request.
     * @param {string} config.token - Authorization token.
     * @param {string} [config.method=GET] - HTTP method.
     * @returns {API} - Returns the API class for chaining.
     */
    static setup({ signal, token, method = this.#method.GET }) {
        let headers = {
            "Content-Type": "application/json",
        };

        if (method === this.#method.GET) {
            headers = {
                ...headers,
                Authorization: `Bearer ${token}`,
            };
        }

        this.#requestConfig = {
            signal,
            method,
            headers,
        };

        return this;
    }

    /**
     * Fetches data using the provided fetch function and parameters.
     * @param {Function} fetchFn - The fetch function to execute.
     * @param {Object} [params={}] - Additional parameters for the fetch function.
     * @returns {Promise<any>} - The result of the fetch operation.
     */
    static async fetch(fetchFn, params = {}) {
        return await fetchFn({ requestConfig: this.#requestConfig, ...params });
    }
}

/**
 * Retrieves the current season and day information for a league.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.leagueId - The ID of the league.
 * @returns {Promise<Object>} - The season and current day information.
 */
export async function Season({ requestConfig, leagueId }) {
    const { sn: season, day: currentDay } = await getRanking({ requestConfig, leagueId });
    return { season, currentDay };
}

/**
 * Retrieves the start and end times for matches on a given day.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {number} params.currentDay - The current day of the competition.
 * @returns {Promise<Object>} - The start and end times of the matches.
 */
export async function Matchtimes({ requestConfig, competitionId, currentDay }) {
    const now = moment.now();
    const { it: matchdays } = await getMatchdays({ requestConfig, competitionId });
    let day = currentDay;
    let matchday = matchdays.find((matchday) => matchday.day === day);
    let startTime = matchday.it[0].dt;
    let lastMatchTime = matchday.it[matchday.it.length - 1].dt;
    let endTime = moment(lastMatchTime).add(1, "days").set({ hour: 20, minute: 0, second: 0, millisecond: 0 });

    if (endTime < now && day !== 34) {
        day = currentDay + 1;
        matchday = matchdays.find((matchday) => matchday.day === day);
        startTime = matchday.it[0].dt;
        lastMatchTime = matchday.it[matchday.it.length - 1].dt;
        endTime = moment(lastMatchTime).add(1, "days").set({ hour: 20, minute: 0, second: 0, millisecond: 0 });
    }

    return {
        startTime,
        matchDay: day,
        endTime: endTime.format("YYYY-MM-DDTHH:mm:ss") + "Z",
        seasonEnd: day === 34,
    };
}

/**
 * Retrieves a list of leagues.
 * @param {Object} requestConfig - Request configuration.
 * @returns {Promise<Array>} - An array of adapted league objects.
 */
export async function Leagues(requestConfig) {
    const { it: leagues } = await getLeagueSelection(requestConfig);
    return Adapter.from(leagues).toArray((league) => new LeagueAdapter(league).adapt());
}

/**
 * Retrieves team abbreviations for a competition.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.competitionId - The ID of the competition.
 * @returns {Promise<Object>} - An object mapping team IDs to their abbreviations.
 */
export async function TeamAbbreviations({ requestConfig, competitionId }) {
    const { it: matchdays } = await getMatchdays({ requestConfig, competitionId });

    return matchdays
        .flatMap(({ it: matches }) => matches.map(({ t1, t1sy, t2, t2sy }) => ({ t1, t1sy, t2, t2sy })))
        .reduce((obj, { t1, t1sy, t2, t2sy }) => {
            if (!obj[t1]) {
                obj[t1] = t1sy;
            }
            if (!obj[t2]) {
                obj[t2] = t2sy;
            }
            return obj;
        }, {});
}

/**
 * Retrieves matchday information for a user in a league.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.leagueId - The ID of the league.
 * @param {Object} params.user - The user object.
 * @param {number} params.currentDay - The current day of the league.
 * @returns {Promise<Array>} - An array of adapted matchday objects.
 */
export async function Matchdays({ requestConfig, leagueId, user, currentDay }) {
    const promises = [];
    for (let dayNumber = 1; dayNumber <= currentDay; dayNumber++) {
        promises.push(
            (async () => {
                const matchday = await getRanking({ requestConfig, leagueId, dayNumber });
                const manager = matchday.us.find((manager) => manager.i === user.id);
                return {
                    day: matchday.day,
                    ...manager,
                };
            })()
        );
    }

    const matchDays = await Promise.all(promises);
    return Adapter.from(matchDays)
        .toArray((matchday) => new MatchdayAdapter(matchday).adapt(user))
        .reverse();
}

/**
 * Retrieves manager information for a specific matchday in a league.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.leagueId - The ID of the league.
 * @param {number} params.matchdayId - The ID of the matchday.
 * @returns {Promise<Array>} - An array of adapted manager objects.
 */
export async function Managers({ requestConfig, leagueId, matchdayId, isLive = false, competitionId = "1" }) {
    const {
        sn: season,
        day,
        nd: nextDay,
        us: managerArray,
    } = await getRanking({ requestConfig, leagueId, dayNumber: matchdayId });

    let managers = managerArray.map((manager) => {
        return {
            ...manager,
            season,
            day,
            nextDay,
        };
    });

    if (isLive) {
        const promises = managers.map(async (manager) => {
            const innerPromises = manager.lp.map(async (playerId) => {
                if (!playerId) {
                    return -100;
                }
                const liveData = await getPlayerEvents({
                    requestConfig,
                    competitionId,
                    playerId,
                    dayNumber: matchdayId,
                });
                return liveData.p;
            }, 0);

            const points = await Promise.all(innerPromises);

            return {
                ...manager,
                mdp: points.filter(Number).reduce((totalPoints, points) => (totalPoints += points), 0),
            };
        });

        managers = await Promise.all(promises);
    }
    const adapted = Adapter.from(managers).toArray((manager) => new ManagerAdapter(manager).adapt());
    return isLive
        ? adapted.sort((a, b) => b.dayPoints - a.dayPoints).map((item, index) => ({ ...item, dayPlacement: index + 1 }))
        : adapted.sort((a, b) => a.dayPlacement - b.dayPlacement);
}

/**
 * Retrieves the lineup for a manager on a specific matchday.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.leagueId - The ID of the league.
 * @param {number} params.matchdayId - The ID of the matchday.
 * @param {string} params.managerId - The ID of the manager.
 * @returns {Promise<Object>} - The manager and their lineup of players.
 */
export async function ManagerLineup({
    requestConfig,
    season,
    leagueId,
    matchdayId,
    managerId,
    isLive = false,
    competitionId = "1",
}) {
    const { us: managers } = await getRanking({ requestConfig, leagueId, dayNumber: matchdayId });
    let otherManagersPoints;

    if (isLive) {
        const otherManagers = managers.filter((manager) => manager.i !== managerId);

        const promises = otherManagers.map(async (manager) => {
            const lineup = manager.lp.filter(Number);
            const innerPromises = lineup.map(async (playerId) => {
                const performance = await getPlayerEvents({
                    requestConfig,
                    competitionId,
                    playerId,
                    dayNumber: matchdayId,
                });
                return performance?.p ?? 0;
            }, 0);

            const pointsArr = await Promise.all(innerPromises);
            const points = pointsArr.reduce((totalPoints, playerPoints) => totalPoints + playerPoints, 0);
            const missingPlayersPenalty = (11 - lineup.length) * 100;

            return {
                ...manager,
                mdp: points - missingPlayersPenalty,
            };
        });
        otherManagersPoints = await Promise.all(promises);
    }

    let manager = managers.find((manager) => manager.i === managerId);

    const { lp: lineupPlayers, nlp: notLineupPlayers } = await getUserLineup({
        requestConfig,
        leagueId,
        userId: managerId,
        dayNumber: matchdayId,
    });

    const players = [
        ...lineupPlayers.map((player) => ({ ...player, lineup: true })),
        ...notLineupPlayers.map((player) => ({ ...player, lineup: false })),
    ];

    const promises = players
        .filter((player) => player.i !== null)
        .map(async (player) => {
            const { i: playerId } = player;
            const profile = await getLeaguePlayerProfile({ requestConfig, leagueId, playerId });
            if (isLive) {
                const performance = await getPlayerEvents({
                    requestConfig,
                    competitionId,
                    playerId,
                    dayNumber: matchdayId,
                });
                return {
                    points: {
                        ...player,
                        ...performance,
                    },
                    profile,
                };
            } else {
                const { it: performances } = await getLeaguePlayerPerformance({ requestConfig, leagueId, playerId });
                const currentSeason = performances.find((item) => item.ti === season);
                if (currentSeason) {
                    const points = currentSeason.ph.find((item) => "" + item.day === "" + matchdayId) || {
                        day: matchdayId,
                        ...DEFAULT_POINTS,
                    };
                    return {
                        points: {
                            ...points,
                            ...player,
                        },
                        profile: profile,
                    };
                } else {
                    return {
                        points: {
                            ...DEFAULT_POINTS,
                            ...player,
                        },
                        profile: profile,
                    };
                }
            }
        });

    const lineup = await Promise.all(promises);

    if (isLive) {
        const lineupPlayers = lineup.filter(({ points }) => points.lineup);
        const missingPlayersPenalty = (11 - lineupPlayers.length) * 100;
        const mdp =
            lineupPlayers
                .filter(({ points }) => points.p !== undefined)
                .reduce((total, { points }) => (total += points.p), 0) - missingPlayersPenalty;
        const allManagers = [...otherManagersPoints, { ...manager, mdp }]
            .sort((a, b) => b.mdp - a.mdp)
            .map((m, index) => {
                return { ...m, mdpl: index + 1 };
            });
        manager = allManagers.find((m) => m.i === managerId);
    }
    return {
        manager: Adapter.from(manager).to((item) => new ManagerAdapter(item).adapt()),
        players: Adapter.from(lineup)
            .toArray((player) => new PlayerAdapter(player).adapt())
            .sort((a, b) => zerosLast(a.dayPoints, b.dayPoints)),
    };
}

/**
 * Retrieves the standings for a specific matchday in a competition.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {number} params.matchdayId - The ID of the matchday.
 * @returns {Promise<Array>} - An array of adapted match objects.
 */
export async function Standing({ requestConfig, competitionId, matchdayId }) {
    const { it: fixtures } = await getMatchdays({ requestConfig, competitionId });

    const { it: matchdayFixtures } = fixtures.find((matchday) => "" + matchday.day === "" + matchdayId);

    const promises = matchdayFixtures.map(async (fixture) => {
        const { mi: matchId } = fixture;
        const matchDetail = await getMatchDetails({ requestConfig, matchId });
        return {
            ...fixture,
            ...matchDetail,
        };
    });

    const standings = await Promise.all(promises);

    return Adapter.from(standings).toArray((match) => new MatchAdapter(match).adapt());
}

/**
 * Retrieves the lineup and details for a specific match in a competition.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.season - The season identifier.
 * @param {string} params.matchId - The ID of the match.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {string} params.teamId - The ID of the team.
 * @param {number} params.matchdayId - The ID of the matchday.
 * @returns {Promise<Object>} - The match details and lineup.
 */
export async function StandingLineup({
    requestConfig,
    season,
    matchId,
    competitionId,
    teamId,
    matchdayId,
    isLive = false,
}) {
    const matchDetails = await getMatchDetails({ requestConfig, matchId });
    const { it: matchLineup } = await getTeamLineup({
        requestConfig,
        competitionId,
        teamId,
        matchdayId,
    });
    let playerPoints;

    if (matchLineup !== undefined) {
        const promises = matchLineup.map(async (player) => {
            const { i: playerId } = player;
            const profile = await getCompetitionPlayerProfile({ requestConfig, competitionId, playerId });
            if (isLive) {
                const performance = await getPlayerEvents({
                    requestConfig,
                    competitionId,
                    playerId,
                    dayNumber: matchdayId,
                });
                return {
                    points: {
                        ...player,
                        ...performance,
                    },
                    profile,
                };
            } else {
                const { it: performances } = await getCompetitionPlayerPerformance({
                    requestConfig,
                    competitionId,
                    playerId,
                });
                const currentSeason = performances.find((item) => item.ti === season);
                if (currentSeason) {
                    const points = currentSeason.ph.find((item) => "" + item.day === "" + matchdayId);
                    return {
                        ...player,
                        profile,
                        points: points || {
                            day: matchdayId,
                            ...DEFAULT_POINTS,
                        },
                    };
                } else {
                    return {
                        ...player,
                        profile,
                        points: {
                            day: matchdayId,
                            ...DEFAULT_POINTS,
                        },
                    };
                }
            }
        });

        playerPoints = await Promise.all(promises);
    } else {
        playerPoints = [];
    }
    return {
        details: Adapter.from({ ...matchDetails, mi: matchId, day: matchdayId }).to((item) =>
            new MatchAdapter(item).adapt()
        ),
        lineup: Adapter.from(playerPoints.filter((defined) => defined))
            .toArray((player) => new PlayerAdapter(player).adapt())
            .sort((a, b) => a.dayPoints - b.dayPoints)
            .reverse(),
    };
}

/**
 * Retrieves the top 25 players for a specific matchday in a competition.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.season - The season identifier.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {number} params.matchdayId - The ID of the matchday.
 * @returns {Promise<Array>} - An array of adapted player objects.
 */
export async function Top25({ requestConfig, season, competitionId, matchdayId }) {
    const { it: teams } = await getTeams({ requestConfig, competitionId });

    const teamIds = teams.map((team) => team.tid);

    let promises = teamIds.map(async (teamId) => {
        const { it: matchLineup } = await getTeamLineup({
            requestConfig,
            competitionId,
            teamId,
            matchdayId,
        });
        return matchLineup;
    });

    const matchdayPlayers = await Promise.all(promises);

    promises = matchdayPlayers
        .flat()
        .filter((player) => player.p > 100)
        .map(async (player) => {
            const { i: playerId } = player;
            const profile = await getCompetitionPlayerProfile({ requestConfig, competitionId, playerId });
            const { it: performances } = await getCompetitionPlayerPerformance({
                requestConfig,
                competitionId,
                playerId,
            });
            const currentSeason = performances.find((item) => item.ti === season);
            if (currentSeason) {
                const points = currentSeason.ph.find((item) => "" + item.day === "" + matchdayId);
                return {
                    ...player,
                    profile,
                    points: points || {
                        day: matchdayId,
                        ...DEFAULT_POINTS,
                    },
                };
            } else {
                return {
                    ...player,
                    profile,
                    points: {
                        day: matchdayId,
                        ...DEFAULT_POINTS,
                    },
                };
            }
        });

    const topPlayers = await Promise.all(promises);
    return Adapter.from(topPlayers.filter((defined) => defined))
        .toArray((player) => new PlayerAdapter(player).adapt())
        .sort((a, b) => a.dayPoints - b.dayPoints)
        .reverse()
        .slice(0, 25);
}

/**
 * Retrieves a list of teams for a competition.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {Object} params.abbreviations - Team abbreviations.
 * @returns {Promise<Array>} - An array of adapted team objects.
 */
export async function Teams({ requestConfig, competitionId, abbreviations }) {
    const { it: teams } = await getTeams({ requestConfig, competitionId });

    const data = Adapter.from(teams)
        .toArray((team) => new TeamAdapter(team).adapt(abbreviations))
        .sort((a, b) => a.placement - b.placement);

    return data;
}

/**
 * Retrieves players for a specific team in a competition.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {string} params.teamId - The ID of the team.
 * @returns {Promise<Array>} - An array of adapted team player objects.
 */
export async function TeamPlayers({ requestConfig, competitionId, teamId }) {
    const { it: teamPlayers } = await getTeamProfile({ requestConfig, competitionId, teamId });

    const promises = teamPlayers.map(async (player) => {
        const { i: playerId } = player;
        const profile = await getCompetitionPlayerProfile({ requestConfig, competitionId, playerId });
        return {
            ...profile,
            ...player,
        };
    });

    const players = await Promise.all(promises);

    return Adapter.from(players)
        .toArray((player) => new TeamPlayerAdapter(player).adapt())
        .sort((a, b) => a.totalPoints - b.totalPoints)
        .reverse();
}

/**
 * Retrieves the live top 25 players for a specific matchday in a competition.
 * @param {Object} params - Parameters for the function.
 * @param {Object} params.requestConfig - Request configuration.
 * @param {string} params.season - The season identifier.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {number} params.matchdayId - The ID of the matchday.
 * @returns {Promise<Array>} - An array of adapted player objects.
 */
export async function LiveTop25({ requestConfig, competitionId, matchdayId }) {
    const { it: players } = await getTopPlayers({ requestConfig, competitionId });
    let promises;

    promises = players.map(async (player) => {
        const { pi: playerId } = player;
        const profile = await getCompetitionPlayerProfile({ requestConfig, competitionId, playerId });
        const performance = await getPlayerEvents({
            requestConfig,
            competitionId,
            playerId,
            dayNumber: matchdayId,
        });
        return {
            points: {
                ...player,
                ...performance,
            },
            profile,
        };
    });

    const playerPoints = await Promise.all(promises);
    return Adapter.from(playerPoints).toArray((player) => new PlayerAdapter(player).adapt());
}
