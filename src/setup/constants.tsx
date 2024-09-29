/**
 * This file contains any constant file declarations used
 * by more than one other file in the software, which do not
 * have any other more logical place to reside.
 */

/**
 * Defined where the JSON file used for storing the user's
 * links should reside.
 * 
 * Note: this was moved out of the API endpoint classes because
 * those classes have strict rules about what they are allowed
 * to export in order to adhere to the NextJS schema.
 */
export const dataFile = "data/links.json"