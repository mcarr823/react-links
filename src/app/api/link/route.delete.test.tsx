import LinkGroup, { ILinkGroup } from "classes/LinkGroup"
import { dataFile } from "../links/route"
import { DELETE } from "./route"
import { writeFile } from "node:fs/promises"
import Link, { ILink } from "classes/Link"
import { NextRequest, NextResponse } from "next/server"
import IGetLinkGroupRequest from "interfaces/IGetLinkGroupRequest"
import IDeleteLinkGroupRequest from "interfaces/IDeleteLinkGroupRequest"

test("DELETE - invalid request", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const req = new NextRequest("")
    let threwAnError = false
    try {
        await DELETE(req)
    } catch (error) {
        threwAnError = true
    }

    expect(threwAnError).toBe(true)

})

test("DELETE - record doesn't exist", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const body: IDeleteLinkGroupRequest = { id:0 }
    const strBody = JSON.stringify(body)
    const req = new NextRequest(strBody)
    let threwAnError = false
    try {
        await DELETE(req)
    } catch (error) {
        threwAnError = true
    }

    expect(threwAnError).toBe(true)

})

test("DELETE - record does exist", async () => {
    
    const id = 1
    const name = 'test'
    const links: Array<Link> = []
    const row = new LinkGroup({ id, name, links })
    const output = JSON.stringify([row])
    await writeFile(dataFile, output)

    // First delete request should succeed
    const body: IDeleteLinkGroupRequest = { id:1 }
    const strBody = JSON.stringify(body)
    const req = new NextRequest(strBody)
    await DELETE(req)

    // Second delete request should fail, since the first
    // request deleted the record
    let threwAnError = false
    try {
        await DELETE(req)
    } catch (error) {
        threwAnError = true
    }

    expect(threwAnError).toBe(true)

})