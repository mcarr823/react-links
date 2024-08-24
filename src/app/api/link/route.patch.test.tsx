/**
 * @jest-environment node
 */

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

    const requestObj = {} as any;
    let threwAnError = false
    try {
        await PATCH(requestObj)
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
    const requestObj = {
        json: async () => (body),
    } as any;
    const response = await PATCH(requestObj)

    expect(response.ok).toBe(false)

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
    const requestObj = {
        json: async () => (body),
    } as any;
    await PATCH(requestObj)
    // TODO readfile and check if the patch succeeded

})