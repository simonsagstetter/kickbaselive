/**
 * Converts a numeric value to a currency string in millions.
 * @param {number} value - The numeric value to convert.
 * @returns {string} The formatted currency string in millions.
 */
export function toCurrency(value) {
    const millions = (value / 1000000).toFixed(1);
    return `€ ${millions} M`;
}

/**
 * Converts points to an earnings string formatted as currency.
 * @param {number} points - The points to convert.
 * @returns {string} The formatted earnings string with a sign.
 */
export function toEarnings(points) {
    let value = points * 1000;
    let sign = value >= 0 ? "+" : "-";
    let formattedValue = Math.abs(value).toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
    });

    return sign + formattedValue;
}

/**
 * Converts a numeric value to a localized string with grouping.
 * @param {number} value - The numeric value to convert.
 * @returns {string} The formatted number string.
 */
export function toNumber(value) {
    const number = new Number(value);
    return number.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true,
    });
}

/**
 * Determines the color style based on points.
 * @param {number} points - The points to evaluate.
 * @returns {Object} An object containing the color style.
 */
export function getColor(points) {
    const dynamicStyle = {
        color: "",
    };

    switch (true) {
        case points > 499:
            dynamicStyle.color = "rgb(250, 197, 48)";
            break;
        case points > 179:
            dynamicStyle.color = "rgb(36, 220, 132)";
            break;
        case points > 89:
            dynamicStyle.color = "rgb(169, 216, 59)";
            break;
        case points > -1:
            dynamicStyle.color = "rgb(232, 78, 20)";
            break;
        case points < 0:
            dynamicStyle.color = "rgb(233, 30, 14)";
            break;
        default:
            dynamicStyle.color = "white";
            break;
    }
    return dynamicStyle;
}

/**
 * Determines the color style based on daily points.
 * @param {number} points - The daily points to evaluate.
 * @returns {Object} An object containing the color style.
 */
export function getDayPointColor(points) {
    const dynamicStyle = {
        color: "",
    };

    switch (true) {
        case points > 1299:
            dynamicStyle.color = "rgb(250, 197, 48)";
            break;
        case points > 999:
            dynamicStyle.color = "rgb(36, 220, 132)";
            break;
        case points > 749:
            dynamicStyle.color = "rgb(169, 216, 59)";
            break;
        case points > 499:
            dynamicStyle.color = "rgb(232, 78, 20)";
            break;
        case points >= 0:
            dynamicStyle.color = "rgb(233, 30, 14)";
            break;
        default:
            dynamicStyle.color = "white";
            break;
    }
    return dynamicStyle;
}

/**
 * Formats a playtime string by appending a single quote if not present.
 * @param {string} [playtimeString=""] - The playtime string to format.
 * @returns {string} The formatted playtime string.
 */
export const formatPlayTime = (playtimeString = "") => {
    if (typeof playtimeString !== "string") {
        playtimeString += "";
    }
    return !playtimeString.split("").includes("'") ? `${playtimeString}'` : playtimeString;
};
