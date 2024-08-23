import LinkGroup, { ILinkGroup } from "classes/LinkGroup"
import { dataFile } from "../links/route"
import { PATCH } from "./route"
import { writeFile } from "node:fs/promises"
import Link, { ILink } from "classes/Link"
import { NextRequest, NextResponse } from "next/server"
import IGetLinkGroupRequest from "interfaces/IGetLinkGroupRequest"
import IPatchLinkGroupRequest from "interfaces/IPatchLinkGroupRequest"

test("PATCH - invalid request", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const req = new NextRequest("")
    let threwAnError = false
    try {
        await PATCH(req)
    } catch (error) {
        threwAnError = true
    }

    expect(threwAnError).toBe(true)

})

test("PATCH - record not found", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const id = 1
    const name = 'test'
    const links: Array<Link> = []
    const linkGroup = new LinkGroup({ id, name, links })
    const body: IPatchLinkGroupRequest = { linkGroup }
    const strBody = JSON.stringify(body)
    const req = new NextRequest(strBody)
    let threwAnError = false
    try {
        await PATCH(req)
    } catch (error) {
        threwAnError = true
    }

    expect(threwAnError).toBe(true)

})

test("PATCH - record found", async () => {
    
    const id = 1
    const name = 'test'
    const links: Array<Link> = []
    const linkGroup = new LinkGroup({ id, name, links })
    const output = JSON.stringify([linkGroup])
    await writeFile(dataFile, output)

    linkGroup.name = 'test2'
    const body: IPatchLinkGroupRequest = { linkGroup }
    const strBody = JSON.stringify(body)
    const req = new NextRequest(strBody)
    await PATCH(req)
    // TODO readfile and check if the patch succeeded

})