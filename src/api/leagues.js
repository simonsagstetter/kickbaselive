import Kickbase from "./env";
import { handleResponse } from "./handlers";

const BASE_URL = Kickbase.getAPIBaseURL();

/** LEAGUES API /leagues/.... */

/** BASE ENDPOINTS */

/**
 * League Selection
 * Asynchronously fetches a list of leagues from the specified endpoint.
 *
 * @param {Object} params - The parameters for the request.
 * @param {Object} params.requestConfig - The configuration object for the fetch request, including headers and other options.
 * @returns {Promise<Object>} A promise that resolves to the response of the [fetch request](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), processed by handleResponse.
 */
export const getLeagueSelection = async ({ requestConfig }) => {
    return await handleResponse(async () => fetch(`${BASE_URL}/leagues/selection/`, requestConfig), "Leagues");
};

/** :LEAGUEID ENDPOINTS */

/**
 * Fetches the ranking for a specific league and optionally for a specific day.
 *
 * @param {Object} options - The configuration options for the request.
 * @param {Object} options.requestConfig - The configuration object for the fetch request.
 * @param {string} options.leagueId - The unique identifier for the league.
 * @param {number|null} [options.dayNumber=null] - The specific day number for which to fetch the ranking. If null, fetches the overall ranking.
 * @returns {Promise<Object>} The response from the fetch request, processed by handleResponse.
 */
export const getRanking = async ({ requestConfig, leagueId, dayNumber = null }) => {
    const path = `${BASE_URL}/leagues/${leagueId}/ranking`;
    const params = dayNumber ? `?dayNumber=${dayNumber}` : "";
    return await handleResponse(async () => fetch(`${path}/${params}`, requestConfig), "Ranking");
};

/** :LEAGUEID and :USERID ENDPOINTS  */

/**
 * Retrieves the user's lineup for a specific league and day.
 *
 * @param {Object} options - The configuration options for the request.
 * @param {Object} options.requestConfig - The configuration object for the fetch request.
 * @param {string} options.leagueId - The ID of the league.
 * @param {string} options.userId - The ID of the user.
 * @param {number|null} [options.dayNumber=null] - The specific day number for which to retrieve the lineup. Defaults to null.
 * @returns {Promise<Object>} The user's lineup data.
 */
export const getUserLineup = async ({ requestConfig, leagueId, userId, dayNumber = null }) => {
    const path = `${BASE_URL}/leagues/${leagueId}/users/${userId}/teamcenter`;
    const params = dayNumber ? `?dayNumber=${dayNumber}` : "";
    return await handleResponse(async () => fetch(`${path}${params}`, requestConfig), "Lineup");
};

/** :LEAGUEID and :PLAYERID ENDPOINTS */

/**
 * Fetches the profile of a player in a specific league.
 *
 * @param {Object} params - The parameters for fetching the player profile.
 * @param {Object} params.requestConfig - The configuration object for the fetch request.
 * @param {string} params.leagueId - The ID of the league.
 * @param {string} params.playerId - The ID of the player.
 * @returns {Promise<Object>} A promise that resolves to the player's profile data.
 */
export const getPlayerProfile = async ({ requestConfig, leagueId, playerId }) => {
    return await handleResponse(
        async () => fetch(`${BASE_URL}/leagues/${leagueId}/players/${playerId}`, requestConfig),
        "Player Profile"
    );
};

/**
 * Fetches the performance data of a specific player in a given league.
 *
 * @param {Object} params - The parameters for fetching player performance.
 * @param {Object} params.requestConfig - The configuration object for the fetch request.
 * @param {string} params.leagueId - The ID of the league.
 * @param {string} params.playerId - The ID of the player.
 * @returns {Promise<Object>} A promise that resolves to the player's performance data.
 */
export const getPlayerPerformance = async ({ requestConfig, leagueId, playerId }) => {
    return await handleResponse(
        async () => fetch(`${BASE_URL}/leagues/${leagueId}/players/${playerId}/performance`, requestConfig),
        "Player Performance"
    );
};
