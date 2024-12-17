import Kickbase from "./env";
import { handleResponse } from "./handlers";

const BASE_URL = Kickbase.getAPIBaseURL();

/** MATCHES API /matches/.... */

/** BASE ENDPOINTS */

/**
 * Fetches the details of a specific match.
 *
 * @param {Object} params - The parameters for fetching match details.
 * @param {Object} params.requestConfig - The configuration object for the fetch request, including headers and other options.
 * @param {string} params.matchId - The unique identifier of the match to retrieve details for.
 * @returns {Promise<Object>} A promise that resolves to the match details.
 */
export const getMatchDetails = async ({ requestConfig, matchId }) => {
    return await handleResponse(
        async () => fetch(`${BASE_URL}/matches/${matchId}/details`, requestConfig),
        "Match Details"
    );
};
