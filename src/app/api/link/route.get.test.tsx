/**
 * @jest-environment node
 */

import LinkGroup from "classes/LinkGroup"
import { GET } from "./route"
import { writeFile } from "node:fs/promises"
import Link from "classes/Link"
import { NextRequest } from "next/server"
import IGetLinkGroupRequest from "interfaces/IGetLinkGroupRequest"
import { dataFile } from "setup/constants"

test("GET - invalid request", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const requestObj = {} as any;
    let threwAnError = false
    try {
        await GET(requestObj)
    } catch (error) {
        threwAnError = true
    }

    expect(threwAnError).toBe(true)

})

test("GET - record doesn't exist", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const body: IGetLinkGroupRequest = { id:0 }
    const requestObj = {
        json: async () => (body),
    } as any;
    const response = await GET(requestObj)

    expect(response.ok).toBe(false)

})

test("GET - record does exist", async () => {
    
    const id = 1
    const name = 'test'
    const links: Array<Link> = []
    const row = new LinkGroup({ id, name, links })
    const output = JSON.stringify([row])
    await writeFile(dataFile, output)

    const body: IGetLinkGroupRequest = { id }
    const requestObj = {
        json: async () => (body),
    } as any;
    const response: Response = await GET(requestObj)
    const json: LinkGroup = await response.json()

    expect(json.id).toBe(id)
    expect(json.name).toBe(name)
    expect(json.links.length).toBe(links.length)

})