import { ILinkGroup } from "classes/LinkGroup"
import { dataFile, GET } from "./route"
import { writeFile } from "node:fs/promises"
import Link, { ILink } from "classes/Link"
import { NextRequest } from "next/server"

test("Get all link groups - invalid json", async () => {

    await writeFile(dataFile, "<xml/>")

    const req = new NextRequest("")
    const results = await GET(req)
    const groups: Array<ILinkGroup> = await results.json()

    expect(groups.length).toBe(0)

})

test("Get all link groups - no links", async () => {

    const output = JSON.stringify([])
    await writeFile(dataFile, output)

    const req = new NextRequest("")
    const results = await GET(req)
    const groups: Array<ILinkGroup> = await results.json()

    expect(groups.length).toBe(0)

})

test("Get all link groups - 1 group, 2 links", async () => {

    const id = 123
    const name = "test name"
    const links: Array<Link> = [
        new Link({
            name:'link1',
            url:'url1',
            favicon:'favicon1'
        }),
        new Link({
            name:'link2',
            url:'url2',
            favicon:'favicon2'
        }),
    ]
    const linkGroups: ILinkGroup = { id, name, links }
    const output = JSON.stringify(linkGroups)
    await writeFile(dataFile, output)

    const req = new NextRequest("")
    const results = await GET(req)
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