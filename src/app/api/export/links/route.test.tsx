/**
 * @jest-environment node
 */

import ILinkGroup from "interfaces/ILinkGroup"
import { GET } from "./route"
import { writeFile } from "node:fs/promises"
import ILink from "interfaces/ILink"
import { dataFile } from "setup/constants"

/**
 * Test the Links JSON export GET request.
 *
 * Make sure the output matches the Links JSON format.
 */
test("GET /api/export/links", async () => {

    const id = 123
    const name = "test name"
    const links: Array<ILink> = [
        {
            name:'link1',
            url:'url1',
            favicon:'favicon1'
        },
        {
            name:'link2',
            url:'url2',
            favicon:'favicon2'
        },
    ]
    const linkGroups: ILinkGroup = { id, name, links }
    const output = JSON.stringify([linkGroups])
    await writeFile(dataFile, output)

    const requestObj = {} as any;
    const results = await GET(requestObj)
    const groups: Array<ILinkGroup> = await results.json()

    expect(groups.length).toBe(1)
    expect(groups[0].id).toBe(id)
    expect(groups[0].name).toBe(name)
    expect(groups[0].links.length).toBe(2)
    expect(groups[0].links[0].name).toBe('link1')
    expect(groups[0].links[0].url).toBe('url1')
    expect(groups[0].links[0].favicon).toBe('favicon1')
    expect(groups[0].links[1].name).toBe('link2')
    expect(groups[0].links[1].url).toBe('url2')
    expect(groups[0].links[1].favicon).toBe('favicon2')

})