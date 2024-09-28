import LinkGroup from "classes/LinkGroup"
import ILinkGroup from "interfaces/ILinkGroup"
import { readFile } from "node:fs/promises"

export const dynamic = 'force-dynamic' // defaults to auto

export const dataFile = "data/links.json"

/**
 * @returns An array of LinkGroup objects
 */
export async function GET(request: Request) {

    const groups = Array<LinkGroup>()

    try {
        const arr: Array<ILinkGroup> = await readFile(dataFile)
        .then(b => b.toString())
        .then(s => JSON.parse(s))
        arr.map(g => new LinkGroup(g))
            .filter(g => g.validate())
            .forEach(g => groups.push(g))
    } catch (error) {
        return Response.error()
    }

    return Response.json(groups)

}
