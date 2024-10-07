/**
 * This file contains any constant file declarations used
 * by more than one other file in the software, which do not
 * have any other more logical place to reside.
 */

import { isJest } from "./functions";
import { Property } from 'csstype'

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

export const defaultModalStyle = {
    display: 'block',
    background: '#000a',
    textAlign: 'center' as Property.TextAlign
}