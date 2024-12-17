import Kickbase from "./env";
import { handleResponse } from "./handlers";

const BASE_URL = Kickbase.getAPIBaseURL();

/** COMPETITIONS API /competitions/.... */

/** BASE ENDPOINTS */

/**
 * Fetches matchdays for a given competition.
 *
 * @param {Object} params - The parameters for the request.
 * @param {Object} params.requestConfig - The configuration for the fetch request.
 * @param {string} params.competitionId - The ID of the competition to fetch matchdays for.
 * @returns {Promise<Object>} A promise that resolves to the response of the matchdays fetch request.
 */
export const getMatchdays = async ({ requestConfig, competitionId }) => {
    return await handleResponse(
        async () => fetch(`${BASE_URL}/competitions/${competitionId}/matchdays`, requestConfig),
        "Matchdays"
    );
};

/**
 * Asynchronously retrieves the teams for a given competition.
 *
 * @param {Object} params - The parameters for the request.
 * @param {Object} params.requestConfig - The configuration for the fetch request, including headers and other options.
 * @param {string} params.competitionId - The ID of the competition for which to retrieve the teams.
 * @returns {Promise<Object>} A promise that resolves to the response of the fetch request, processed by handleResponse.
 */
export const getTeams = async ({ requestConfig, competitionId }) => {
    return await handleResponse(
        async () => fetch(`${BASE_URL}/competitions/${competitionId}/table`, requestConfig),
        "Teams"
    );
};

/**
 * Fetches the top players for a given competition.
 *
 * @param {Object} options - The options for fetching top players.
 * @param {Object} options.requestConfig - The configuration for the fetch request.
 * @param {string} options.competitionId - The ID of the competition to fetch players for.
 * @param {number} [options.dayNumber] - The specific day number to filter players by (optional).
 * @returns {Promise<Object>} A promise that resolves to the response containing the top players.
 */
export const getTopPlayers = async ({ requestConfig, competitionId, dayNumber = undefined }) => {
    const path = `${BASE_URL}/competitions/${competitionId}/players`;
    const params = dayNumber ? `?dayNumber=${dayNumber}` : "";
    return await handleResponse(async () => fetch(`${path}${params}`, requestConfig), "Top 25");
};

/** /competitions/:competitionId */

/** /competitions/:competitionId/..../:teamdId */

/**
 * Fetches the match lineup for a specific team in a competition.
 *
 * @param {Object} params - The parameters for fetching the match lineup.
 * @param {Object} params.requestConfig - The configuration for the fetch request, including headers and other options.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {string} params.teamId - The ID of the team.
 * @param {string} [params.matchdayId] - The optional ID of the matchday. If provided, it will be used to filter the lineup by matchday.
 * @returns {Promise<Object>} The response from the fetch request, processed by handleResponse.
 */
export const getTeamLineup = async ({ requestConfig, competitionId, teamId, matchdayId }) => {
    const path = `${BASE_URL}/competitions/${competitionId}/teams/${teamId}/teamcenter`;
    const params = matchdayId ? `?dayNumber=${matchdayId}` : "";
    return await handleResponse(async () => fetch(`${path}${params}`, requestConfig), "Match Lineup");
};

/**
 * Fetches the team profile for a specific team within a competition.
 *
 * @param {Object} params - The parameters for the request.
 * @param {Object} params.requestConfig - The configuration object for the fetch request.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {string} params.teamId - The ID of the team.
 * @returns {Promise<Object>} A promise that resolves to the team profile data.
 */
export const getTeamProfile = async ({ requestConfig, competitionId, teamId }) => {
    return await handleResponse(
        async () => fetch(`${BASE_URL}/competitions/${competitionId}/teams/${teamId}/teamprofile`, requestConfig),
        "Team Profile"
    );
};

/** /competitions/:competitionId/..../:playerId */

/**
 * Fetches the profile of a player for a specific competition.
 *
 * @param {Object} params - The parameters for fetching the player profile.
 * @param {Object} params.requestConfig - The configuration object for the fetch request, including headers and other options.
 * @param {string} params.competitionId - The unique identifier of the competition.
 * @param {string} params.playerId - The unique identifier of the player.
 * @returns {Promise<Object>} A promise that resolves to the player's profile data.
 */
export const getPlayerProfile = async ({ requestConfig, competitionId, playerId }) => {
    return await handleResponse(
        async () => fetch(`${BASE_URL}/competitions/${competitionId}/players/${playerId}`, requestConfig),
        "Player Profile"
    );
};

/**
 * Fetches the performance data of a specific player in a given competition.
 *
 * @param {Object} params - The parameters for fetching player performance.
 * @param {Object} params.requestConfig - The configuration object for the fetch request.
 * @param {string} params.competitionId - The ID of the competition.
 * @param {string} params.playerId - The ID of the player.
 * @returns {Promise<Object>} A promise that resolves to the player's performance data.
 */
export const getPlayerPerformance = async ({ requestConfig, competitionId, playerId }) => {
    return await handleResponse(
        async () => fetch(`${BASE_URL}/competitions/${competitionId}/players/${playerId}/performance`, requestConfig),
        "Player Performance"
    );
};

/**
 * Fetches player events for a specific competition and player.
 *
 * @param {Object} options - The options for the request.
 * @param {Object} options.requestConfig - The configuration for the fetch request.
 * @param {string} options.competitionId - The ID of the competition.
 * @param {string} options.playerId - The ID of the player.
 * @param {number} [options.dayNumber] - The specific day number to filter events (optional).
 * @returns {Promise<Object>} The response from the fetch call, processed by handleResponse.
 */
export const getPlayerEvents = async ({ requestConfig, competitionId, playerId, dayNumber = undefined }) => {
    const path = `${BASE_URL}/competitions/${competitionId}/playercenter/${playerId}`;
    const params = dayNumber ? `?dayNumber=${dayNumber}` : "";
    return await handleResponse(async () => fetch(`${path}${params}`, requestConfig), "Player Performance");
};
