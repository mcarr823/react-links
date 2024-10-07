import LinkGroup from "classes/LinkGroup"
import IImportLinksTextRequest from "interfaces/IImportLinksTextRequest"
import { dataFile } from "setup/constants"
import { writeFile } from "node:fs/promises"
import { GET as getLinks } from "../../../links/route"
import ILinkGroup from "interfaces/ILinkGroup"

/**
 * PUT request for the /api/import/onetab/text/ route.
 * 
 * Imports a Onetab export, passed as a string, and adds
 * any parsed LinkGroup objects into `dataFile`.
 * 
 * @param request HTTP request containing IImportLinksTextRequest
 * JSON data.
 * @returns Either an empty JSON object, or an error
 */
export async function PUT(request: Request) {

    const json: IImportLinksTextRequest = await request.json()
    const text = json.text

    try {

        // Start by parsing the new entries.
        // If any of them are invalid, throw an error.
        const groups = text.split("\n\n")
        const linkGroups = groups.map(LinkGroup.importOnetab)
        linkGroups.forEach(g => {
            if (!g.validate()) throw new Error("Invalid linkgroup")
        })

        // Then grab the existing entries
        const oldLinkGroups: Array<ILinkGroup> = await getLinks(request).then(r => r.json())
        const oldIds = oldLinkGroups.map(g => g.id)
        const biggestId = oldIds.length > 0 ? Math.max(...oldIds) : 0

        // Adjust the IDs of the new entries so that they don't
        // overwrite the IDs of the old entries.
        // We don't want any duplicate IDs.
        linkGroups.forEach((g, index) => {
            g.id = biggestId + index + 1
            oldLinkGroups.push(g)
        })

        // Finally, write all of the entries, both old and new, into
        // the JSON file together.
        const output = JSON.stringify(oldLinkGroups)
        await writeFile(dataFile, output)
    
        return Response.json({})
    } catch (error) {
        return Response.error()
    }

}