/**
 * @jest-environment node
 */

import LinkGroup from "classes/LinkGroup"
import ILinkGroup from "interfaces/ILinkGroup"
import { dataFile } from "../links/route"
import { DELETE } from "./route"
import { writeFile } from "node:fs/promises"
import Link from "classes/Link"
import ILink from "interfaces/ILink"
import { NextRequest, NextResponse } from "next/server"
import IGetLinkGroupRequest from "interfaces/IGetLinkGroupRequest"
import IDeleteLinkGroupRequest from "interfaces/IDeleteLinkGroupRequest"

test("DELETE - invalid request", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const requestObj = {} as any;
    const response = await DELETE(requestObj)

    expect(response.ok).toBe(false)

})

test("DELETE - record doesn't exist", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const body: IDeleteLinkGroupRequest = { id:0 }
    const requestObj = {
        json: async () => (body),
    } as any;
    const response = await DELETE(requestObj)

    expect(response.ok).toBe(false)

})

test("DELETE - record does exist", async () => {
    
    const id = 1
    const name = 'test'
    const links: Array<Link> = []
    const row = new LinkGroup({ id, name, links })
    const output = JSON.stringify([row])
    await writeFile(dataFile, output)

    const body: IDeleteLinkGroupRequest = { id:1 }
    const requestObj = {
        json: async () => (body),
    } as any;

    // First delete request should succeed
    const response1 = await DELETE(requestObj)
    expect(response1.ok).toBe(true)

    // Second delete request should fail, since the first
    // request deleted the record
    const response2 = await DELETE(requestObj)
    expect(response2.ok).toBe(false)

})