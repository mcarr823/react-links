import LinkGroup from "classes/LinkGroup"
import { dataFile } from "../links/route"
import { GET } from "./route"
import { writeFile } from "node:fs/promises"
import Link from "classes/Link"
import { NextRequest } from "next/server"
import IGetLinkGroupRequest from "interfaces/IGetLinkGroupRequest"

test("GET - invalid request", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const req = new NextRequest("")
    let threwAnError = false
    try {
        await GET(req)
    } catch (error) {
        threwAnError = true
    }

    expect(threwAnError).toBe(true)

})

test("GET - record doesn't exist", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const body: IGetLinkGroupRequest = { id:0 }
    const strBody = JSON.stringify(body)
    const req = new NextRequest(strBody)
    let threwAnError = false
    try {
        await GET(req)
    } catch (error) {
        threwAnError = true
    }

    expect(threwAnError).toBe(true)

})

test("GET - record does exist", async () => {
    
    const id = 1
    const name = 'test'
    const links: Array<Link> = []
    const row = new LinkGroup({ id, name, links })
    const output = JSON.stringify([row])
    await writeFile(dataFile, output)

    const body: IGetLinkGroupRequest = { id:0 }
    const strBody = JSON.stringify(body)
    const req = new NextRequest(strBody)
    const response: Response = await GET(req)
    const json: LinkGroup = await response.json()

    expect(json.id).toBe(id)
    expect(json.name).toBe(name)
    expect(json.links.length).toBe(links.length)

})