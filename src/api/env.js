/**
 * Class representing the Kickbase API configuration and utilities.
 */
export default class Kickbase {
    /** @private @constant {string} The base URL for the Kickbase API. */
    static #API_URL = "https://api.kickbase.com/";

    /** @private @constant {string} The base URL for the Kickbase CDN. */
    static #CDN_URL = "https://cdn.kickbase.com/";

    /** @private @constant {string} The API version to use. */
    static #API_VERSION = "v4";

    /**
     * Get the configuration for a GET request.
     * @returns {Object} The configuration object for a GET request.
     */
    static getRequestConfig() {
        return {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };
    }

    /**
     * Get the configuration for a POST request.
     * @returns {Object} The configuration object for a POST request.
     */
    static getPOSTRequestConfig() {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };
    }

    /**
     * Get the base URL for the API including the version.
     * @returns {string} The full API base URL.
     */
    static getAPIBaseURL() {
        return `${this.#API_URL}${this.#API_VERSION}`;
    }

    /**
     * Get the base URL for the CDN, optionally including the version.
     * @param {boolean} [includeVersion=false] - Whether to include the API version in the URL.
     * @returns {string} The full CDN base URL.
     */
    static getCDNBaseURL(includeVersion = false) {
        return `${this.#CDN_URL}${includeVersion ? this.#API_VERSION + "/" : ""}`;
    }
}
