/**
 * This file contains any constant file declarations used
 * by more than one other file in the software, which do not
 * have any other more logical place to reside.
 */

/**
 * Defines where the JSON file used for storing the user's
 * links should reside.
 * 
 * The exact path will vary depending on whether we're running
 * live, or from a unit test.
 * 
 * Note: this was moved out of the API endpoint classes because
 * those classes have strict rules about what they are allowed
 * to export in order to adhere to the NextJS schema.
 */
export const dataFile = isJest() ? "data/jest.json" : "data/links.json"

/**
 * Checks if the current process is running from Jest or not.
 * ie. If we're in the middle of running a unit test.
 * 
 * @returns true if this process is running from Jest
 */
function isJest(): Boolean {
    return process.env.JEST_WORKER_ID !== undefined
}