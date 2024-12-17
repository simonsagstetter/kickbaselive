import Kickbase from "./env";

const BASE_URL = Kickbase.getAPIBaseURL();
const POST_REQUEST_CONFIG = Kickbase.getPOSTRequestConfig();

/** USER API /user/... */

/**
 * User Login
 * Authenticates a user by sending their login credentials to the server.
 *
 * @param {Object} login - The login credentials of the user.
 * @param {string} login.username - The username of the user.
 * @param {string} login.password - The password of the user.
 * @returns {Promise<Response>} A promise that resolves to the server's response.
 */
export const authenticate = async (login) => {
    return await fetch(`${BASE_URL}/user/login`, { ...POST_REQUEST_CONFIG, body: JSON.stringify(login) });
};
