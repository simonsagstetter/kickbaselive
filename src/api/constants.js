/** API CONSTANTS */

/**
 * A map of player positions with their corresponding codes.
 * @type {Map<number, string>}
 */
export const playerPositions = new Map([
    [1, "GK"], // Goalkeeper
    [2, "DEF"], // Defender
    [3, "MF"], // Midfielder
    [4, "FWD"], // Forward
]);

/**
 * A map of player statuses with their corresponding codes.
 * @type {Map<number, string>}
 */
export const playerStatus = new Map([
    [0, "Fit"], // Player is fit to play
    [1, "Injured"], // Player is injured
    [2, "Stricken"], // Player is stricken
    [4, "Rehab"], // Player is in rehabilitation
    [16, "Yellow-Red Card"], // Player has a yellow-red card
    [32, "5. Yellow Card"], // Player has received a fifth yellow card
    [256, "Away"], // Player is away
]);

/**
 * An object representing various game events and their initial counts.
 * @type {Object}
 * @property {number} assists - Number of assists
 * @property {number} nogoal - Number of no goals
 * @property {number} goals - Number of goals
 * @property {number} yellowCard - Number of yellow cards
 * @property {number} yellowRedCard - Number of yellow-red cards
 * @property {number} redCard - Number of red cards
 * @property {number} penalty - Number of penalties
 */
export const GAME_EVENTS = {
    assists: 0,
    nogoal: 0,
    goals: 0,
    yellowCard: 0,
    yellowRedCard: 0,
    redCard: 0,
    penalty: 0,
};

/**
 * An object representing the status of a player on a given day.
 * @type {Object}
 * @property {boolean} s11 - Whether the player is in the starting 11
 * @property {boolean} sub - Whether the player is a substitute
 * @property {boolean} full - Whether the player played the full match
 * @property {boolean} bench - Whether the player was on the bench
 * @property {boolean} miss - Whether the player missed the match
 */
export const DAY_STATUS_EVENTS = {
    s11: false,
    sub: false,
    full: false,
    bench: false,
    miss: false,
};

export const DEFAULT_POINTS = {
    t1: "0",
    t2: "0",
    mp: "'0",
};
