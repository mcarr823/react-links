/**
 * @jest-environment node
 */

import LinkGroup from "classes/LinkGroup"
import ILinkGroup from "interfaces/ILinkGroup"
import { dataFile } from "../links/route"
import { PUT } from "./route"
import { writeFile, readFile } from "node:fs/promises"
import Link from "classes/Link"
import { NextRequest, NextResponse } from "next/server"
import IPutLinkGroupRequest from "interfaces/IPutLinkGroupRequest"

test("PUT - invalid request", async () => {

    const requestObj = {} as any;
    let threwAnError = false
    try {
        await PUT(requestObj)
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
    const requestObj = {
        json: async () => (body),
    } as any;
    await PUT(requestObj)

    const buf = await readFile(dataFile)
    const str = buf.toString()
    const json: [ILinkGroup] = JSON.parse(str)

    expect(json.length).toBe(1)
    expect(json[0].id).toBe(id)
    expect(json[0].name).toBe(name)
    expect(json[0].links.length).toBe(links.length)

})