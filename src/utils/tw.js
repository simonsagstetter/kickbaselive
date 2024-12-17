/**
 * Class representing a Tailwind CSS style sheet.
 */
export class TailwindStyleSheet {
    /**
     * Create a TailwindStyleSheet.
     * @param {Object} styles - The styles object to be processed.
     * @throws Will throw an error if the input is not a non-null object.
     * @returns {Object} The processed stylesheet object.
     */
    constructor(styles) {
        if (!styles || typeof styles !== "object" || Array.isArray(styles)) {
            throw new Error("TailwindStyleSheet requires a non-null object as input.");
        }

        return this.extract(styles);
    }

    /**
     * Extracts and processes the styles into a Tailwind CSS compatible format.
     * @param {Object} styles - The styles object to be processed.
     * @returns {Object} The processed stylesheet object with class names.
     */
    extract(styles) {
        const stylesheet = {};

        /**
         * Recursively traverses the styles object to collect class names.
         * @param {Object} obj - The current object to traverse.
         * @param {Array} classes - The array to accumulate class names.
         * @returns {Array} The array of collected class names.
         */
        const traverse = (obj, classes = []) => {
            for (const key in obj) {
                if (typeof obj[key] === "string" && obj[key].trim() !== "") {
                    classes.push(obj[key].trim());
                } else if (typeof obj[key] === "object" && obj[key] !== null) {
                    traverse(obj[key], classes);
                }
            }
            return classes;
        };

        for (const key in styles) {
            const classes = traverse(styles[key]);
            stylesheet[key] = classes.join(" ");
        }

        return stylesheet;
    }
}

/**
 * Merges a nested style object into a single string of class names.
 *
 * This function traverses a nested object structure, collecting all non-empty
 * string values and concatenating them into a single space-separated string.
 *
 * @param {Object} style - The nested object containing style definitions.
 * @returns {string} A space-separated string of class names.
 */
export function merge(style) {
    const classes = [];

    /**
     * Recursively traverses the object to collect class names.
     *
     * @param {Object} obj - The current object to traverse.
     * @returns {Array} An array of collected class names.
     */
    const traverse = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === "string" && obj[key].trim() !== "") {
                classes.push(obj[key].trim());
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
                traverse(obj[key], classes);
            }
        }
        return classes;
    };

    traverse(style);

    return classes.join(" ");
}
