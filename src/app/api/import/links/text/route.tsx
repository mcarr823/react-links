import LinkGroup from "classes/LinkGroup"
import IImportLinksTextRequest from "interfaces/IImportLinksTextRequest"
import ILinkGroup from "interfaces/ILinkGroup"
import { dataFile } from "setup/constants"
import { writeFile } from "node:fs/promises"

// Inserts a new row
export async function PUT(request: Request) {

    const json: IImportLinksTextRequest = await request.json()
    const text = json.text
    try {
        const iLinkGroups: Array<ILinkGroup> = JSON.parse(text)
        const linkGroups = iLinkGroups.map(g => new LinkGroup(g))
                                        .filter(g => g.validate())

        const output = JSON.stringify(linkGroups)
        await writeFile(dataFile, output)
    
        return Response.json({})
    } catch (error) {
        return Response.error()
    }

}