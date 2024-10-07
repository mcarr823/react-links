/**
 * @jest-environment node
 */

import ILinkGroup from "interfaces/ILinkGroup"
import { PUT } from "./route"
import { writeFile, readFile } from "node:fs/promises"
import IImportLinksTextRequest from "interfaces/IImportLinksTextRequest"
import { dataFile } from "setup/constants"
import ILink from "interfaces/ILink"
import { DataFormat } from "enums/DataFormat"

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
    const links: Array<ILink> = []
    const linkGroup: ILinkGroup = { id, name, links }
    const body: IImportLinksTextRequest = {
        format: DataFormat.LINKS,
        text: JSON.stringify([linkGroup])
    }
    const requestObj = {
        json: async () => (body),
    } as any;
    await PUT(requestObj)

    const buf = await readFile(dataFile)
    const str = buf.toString()
    const json: ILinkGroup[] = JSON.parse(str)

    expect(json.length).toBe(1)
    expect(json[0].id).toBe(id)
    expect(json[0].name).toBe(name)
    expect(json[0].links.length).toBe(links.length)

})

/**
 * This test is the same as the one above, but it also
 * performs a second PUT request afterwards to check if
 * the ID from the second request was automatically adjusted
 * to avoid duplication.
 */
test("PUT - ID check", async () => {
    
    const output = JSON.stringify([])
    await writeFile(dataFile, output)
    
    const id = 1
    const name = 'test'
    const links: Array<ILink> = []
    const linkGroup: ILinkGroup = { id, name, links }
    const body: IImportLinksTextRequest = {
        format: DataFormat.LINKS,
        text: JSON.stringify([linkGroup])
    }
    const requestObj = {
        json: async () => (body),
    } as any;
    await PUT(requestObj)

    // Run the request a second time
    await PUT(requestObj)

    const buf = await readFile(dataFile)
    const str = buf.toString()
    const json: ILinkGroup[] = JSON.parse(str)

    // We ran the request twice, so there should be 2 entries
    expect(json.length).toBe(2)

    // The first entry should match the initial PUT
    expect(json[0].id).toBe(id)
    expect(json[0].name).toBe(name)
    expect(json[0].links.length).toBe(links.length)

    // The second entry should be the same, but with the
    // ID incremented by 1 automatically to avoid duplication
    expect(json[1].id).toBe(id+1)
    expect(json[1].name).toBe(name)
    expect(json[1].links.length).toBe(links.length)

})