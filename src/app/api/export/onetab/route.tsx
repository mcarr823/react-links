import LinkGroup from "classes/LinkGroup"
import { GET as getLinks } from "../../links/route"
import ILinkGroup from "interfaces/ILinkGroup"

export const dynamic = 'force-dynamic' // defaults to auto

/**
 * This API route downloads the contents of `dataFile` (data/links.json)
 * after converting it from the Links JSON format into the Onetab
 * pipe-delimited/newline-delimited text format.
 * 
 * The onetab format has each link represented as: $url | $name
 * Links within a tab group are separated by one newline character.
 * Individual tab groups are separated by two newline characters.
 * 
 * @returns HTTP response containing the exported Onetab data
 * as a string.
 */
export async function GET(request: Request) {

    const linkGroups: Array<ILinkGroup> = await getLinks(request).then(r => r.json())
    const responseString = linkGroups.map(g => new LinkGroup(g))
        .map(g => g.exportOnetab())
        .join("\n\n")

    const headers = new Headers();
    headers.append("Content-Disposition", 'attachment; filename="links.txt"');
    headers.append("Content-Type", "text/plain");

    return new Response(responseString, { headers });

}
