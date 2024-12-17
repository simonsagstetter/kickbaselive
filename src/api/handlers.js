import { json } from "react-router-dom";

/** HTTP Handlers */

/**
 * Handles the response from a fetch function, throwing an error if the response is not ok.
 *
 * @param {Function} fetchFn - The asynchronous function that performs the fetch operation.
 * @param {string} entity - The name of the entity being fetched, used in error messages.
 *
 * @returns {Promise<Object>} - A promise that resolves to the JSON-parsed response body.
 *
 * @throws {Response|Object} - Throws a Response object if the fetch fails with a non-ok status,
 *                             or a custom error object if a network error occurs.
 */
export async function handleResponse(fetchFn, entity) {
    try {
        const response = await fetchFn();
        if (!response.ok) {
            const { status, statusText, type } = response;

            throw json(
                {
                    title: `Could not fetch ${entity}!`,
                    message: "Please try to refresh the page or try again in a few moments.",
                },
                { status, statusText, type }
            );
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Response) {
            throw error;
        }

        throw json(
            {
                title: "Network Error",
                message: error.message,
            },
            {
                status: 503,
                statusText: "",
                type: "error",
            }
        );
    }
}
