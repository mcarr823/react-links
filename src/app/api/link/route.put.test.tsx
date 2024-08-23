import LinkGroup, { ILinkGroup } from "classes/LinkGroup"
import { dataFile } from "../links/route"
import { PUT } from "./route"
import { writeFile, readFile } from "node:fs/promises"
import Link from "classes/Link"
import { NextRequest, NextResponse } from "next/server"
import IPutLinkGroupRequest from "interfaces/IPutLinkGroupRequest"

test("PUT - invalid request", async () => {

    const req = new NextRequest("")
    let threwAnError = false
    try {
        await PUT(req)
    } catch (error) {
        threwAnError = true
    }

    expect(threwAnError).toBe(true)

})

test("PUT - valid request", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)
    
    const id = 1
    const name = 'test'
    const links: Array<Link> = []
    const linkGroup = new LinkGroup({ id, name, links })
    const body: IPutLinkGroupRequest = { linkGroup }
    const strBody = JSON.stringify(body)
    const req = new NextRequest(strBody)
    await PUT(req)

    const buf = await readFile(dataFile)
    const str = buf.toString()
    const json: ILinkGroup = JSON.parse(str)

    expect(json.id).toBe(id)
    expect(json.name).toBe(name)
    expect(json.links.length).toBe(links.length)

})