import Kickbase from "./env";

/** FILES API .../files/.... */

/** v4 ENDPOINTS */

/**
 * Generates the URL for the league image based on the provided league ID.
 *
 * @param {string} leagueId - The unique identifier for the league.
 * @returns {string} The complete URL to access the league image.
 */
export const getLeagueImage = (leagueId) => {
    return `${Kickbase.getCDNBaseURL(true)}files/leagues/${leagueId}`;
};

/** v1 ENDPOINTS */

/**
 * Retrieves the URL for a user's image from the CDN.
 *
 * @param {string} userId - The unique identifier for the user.
 * @param {string} [imageType="0"] - The type of image to retrieve. Defaults to "0".
 * @returns {string} The full URL to the user's image.
 */
export const getUserImage = (userId, imageType = "0") => {
    return `${Kickbase.getCDNBaseURL()}files/users/${userId}/${imageType}`;
};

/**
 * Retrieves the URL for a player's image from the CDN.
 *
 * @param {string} playerId - The unique identifier for the player.
 * @param {string} [imageType="1"] - The type of image to retrieve. Defaults to "1".
 * @returns {string} The complete URL to the player's image.
 */
export const getPlayerImage = (playerId, imageType = "1") => {
    return `${Kickbase.getCDNBaseURL()}files/players/${playerId}/${imageType}`;
};

/**
 * Generates the URL for a team's image based on the team ID and image type.
 *
 * @param {string} teamId - The unique identifier for the team.
 * @param {string} [imageType="0"] - The type of image to retrieve. Defaults to "0".
 * @returns {string} The complete URL to the team's image on the CDN.
 */
export const getTeamImage = (teamId, imageType = "0") => {
    return `${Kickbase.getCDNBaseURL()}files/teams/${teamId}/${imageType}`;
};
