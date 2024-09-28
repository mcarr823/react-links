import LinkGroup from "classes/LinkGroup"
import ILinkGroup from "interfaces/ILinkGroup"
import IGetLinkGroupRequest from "interfaces/IGetLinkGroupRequest"
import IPutLinkGroupRequest from "interfaces/IPutLinkGroupRequest"
import { GET as getLinks, dataFile } from "../links/route"
import { writeFile } from "node:fs/promises"
import IPatchLinkGroupRequest from "interfaces/IPatchLinkGroupRequest"
import IDeleteLinkGroupRequest from "interfaces/IDeleteLinkGroupRequest"

export const dynamic = 'force-dynamic' // defaults to auto

/**
 * @returns A LinkGroup object
 */
export async function GET(request: Request) {

    const json: IGetLinkGroupRequest = await request.json()
    const id = json.id

    const linkGroups: Array<LinkGroup> = await getLinks(request).then(r => r.json())
    const link = linkGroups.find(g => g.id == id)
    if (link)
        return Response.json(link)
    else
        return Response.error()

}

// Inserts a new row
export async function PUT(request: Request) {

    const json: IPutLinkGroupRequest = await request.json()
    const newGroup = json.linkGroup

    const linkGroups: Array<ILinkGroup> = await getLinks(request).then(r => r.json())
    linkGroups.push(newGroup)

    const output = JSON.stringify(linkGroups)
    await writeFile(dataFile, output)

    return Response.json({})

}

export async function PATCH(request: Request) {

    const json: IPatchLinkGroupRequest = await request.json()
    const linkGroup = json.linkGroup
    const id = linkGroup.id

    const linkGroups: Array<LinkGroup> = await getLinks(request).then(r => r.json())
    const index = linkGroups.findIndex(g => g.id == id)

    if (index == -1)
        return Response.error()

    const updatedGroups = [
        ...linkGroups.slice(0, index),
        linkGroup,
        ...linkGroups.slice(index + 1)
    ]

    const output = JSON.stringify(updatedGroups)
    await writeFile(dataFile, output)

    return Response.json({})

}

export async function DELETE(request: Request) {

    let id: number
    try {
        const json: IDeleteLinkGroupRequest = await request.json()
        id = json.id 
    } catch (error) {
        return Response.error()
    }

    const linkGroups: Array<LinkGroup> = await getLinks(request).then(r => r.json())
    const index = linkGroups.findIndex(g => g.id == id)

    if (index == -1)
        return Response.error()

    const updatedGroups = [
        ...linkGroups.slice(0, index),
        ...linkGroups.slice(index + 1)
    ]

    const output = JSON.stringify(updatedGroups)
    await writeFile(dataFile, output)

    return Response.json({})

}


