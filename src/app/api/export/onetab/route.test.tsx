/**
 * @jest-environment node
 */

import ILinkGroup from "interfaces/ILinkGroup"
import { GET } from "./route"
import { writeFile } from "node:fs/promises"
import ILink from "interfaces/ILink"
import { dataFile } from "setup/constants"

/**
 * Test the onetab export GET request.
 *
 * Make sure the output matches the onetab format.
 */
test("GET /api/export/onetab", async () => {

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
    const output = JSON.stringify([linkGroups, linkGroups])
    await writeFile(dataFile, output)

    const requestObj = {} as any;
    const results = await GET(requestObj)
    const onetabString: String = await results.text()

    const expectedResult = `${links[0].url} | ${links[0].name}\n`+
                            `${links[1].url} | ${links[1].name}\n\n`+
                            `${links[0].url} | ${links[0].name}\n`+
                            `${links[1].url} | ${links[1].name}`
    expect(onetabString).toBe(expectedResult)

})